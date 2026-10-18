// Sol Ethio Coder - contact form backend (Google Apps Script).
//
// What it does for every valid submission:
//   1. Saves a row in your Google Sheet.
//   2. Emails YOU the message (you can reply straight to the visitor).
//   3. Emails the VISITOR an automatic confirmation.
//
// Setup: paste this whole file into Extensions > Apps Script, then
// Deploy > New deployment > Web app > Execute as: Me > Who has access: Anyone.
// After pasting a new version: Deploy > Manage deployments > pencil > Version: New version > Deploy
// (this keeps the same /exec URL). Run `authorizeEmail` once so Google asks for email permission.

const SHEET_ID = "11Z8W7LcBEeyJd7IDyGlWbYKf0gBZ-MofGrmYZNGkJzk";
const SHEET_NAME = "Project Leads";
const OWNER_EMAIL = "solethiocoder@gmail.com";
const OWNER_NAME = "Solomon Ashagre";
const SITE_URL = "https://sol-ethio-coder.netlify.app";

const SEND_AUTO_REPLY = true;       // set to false to turn the confirmation email off
const MAX_AUTO_REPLIES_PER_DAY = 40; // protects your Gmail quota from abuse
const MAX_MESSAGE_LENGTH = 5000;

const HEADERS = [
  "Submitted At", "Lead ID", "Name", "Email", "Subject", "Budget",
  "Project Type", "Timeline", "Message", "Source", "Page URL", "User Agent",
];

function doGet() {
  ensureSheet();
  return jsonResponse({ status: "ready", message: "Sol Ethio Coder contact endpoint is live.", sheetName: SHEET_NAME });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const raw = readPayload(e);

    // Hidden spam-trap field: real visitors never fill it. Pretend success so bots move on.
    if (raw.website) return jsonResponse({ status: "success", message: "OK" });

    const payload = clean(raw);
    const problem = validate(payload);
    if (problem) return jsonResponse({ status: "error", message: problem });

    if (isThrottled(payload.email)) {
      return jsonResponse({ status: "error", message: "You just sent a message. Please wait a few minutes before sending another." });
    }

    const sheet = ensureSheet();
    sheet.appendRow([
      payload.submittedAt || new Date().toISOString(),
      payload.id || Utilities.getUuid(),
      payload.name, payload.email, payload.subject, payload.budget,
      payload.projectType, payload.timeline, payload.message,
      payload.source, payload.pageUrl, payload.userAgent,
    ]);
    SpreadsheetApp.flush();

    // Email problems must never lose the lead, so each send is guarded on its own.
    const ownerEmailed = tryRun(function () { notifyOwner(payload); });
    const visitorEmailed = SEND_AUTO_REPLY && withinDailyLimit() ? tryRun(function () { confirmToVisitor(payload); }) : false;

    return jsonResponse({
      status: "success",
      message: "Message received.",
      ownerEmailed: ownerEmailed,
      confirmationSent: visitorEmailed,
    });
  } catch (error) {
    return jsonResponse({ status: "error", message: String(error && error.message ? error.message : error) });
  } finally {
    lock.releaseLock();
  }
}

// ---------- email ----------

function notifyOwner(p) {
  const subject = "New message from " + p.name + ": " + (p.subject || "Project inquiry");
  const body = [
    "You have a new message from your portfolio.",
    "",
    "Name: " + p.name,
    "Email: " + p.email,
    "Project type: " + p.projectType,
    "Budget: " + p.budget,
    "Timeline: " + p.timeline,
    "",
    "Message:",
    p.message,
    "",
    "Page: " + p.pageUrl,
    "Reply to this email to answer " + p.name + " directly.",
  ].join("\n");

  MailApp.sendEmail({ to: OWNER_EMAIL, subject: subject, body: body, replyTo: p.email, name: "Portfolio contact form" });
}

function confirmToVisitor(p) {
  const subject = "Thanks for your message, " + firstName(p.name);
  const text = [
    "Hi " + firstName(p.name) + ",",
    "",
    "Thank you for reaching out. I received your message and I will reply to you by email as soon as I can.",
    "",
    "Here is a copy of what you sent:",
    "Project type: " + p.projectType,
    "",
    p.message,
    "",
    "Best regards,",
    OWNER_NAME,
    SITE_URL,
  ].join("\n");

  const html =
    '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#111;max-width:560px">' +
    "<p>Hi " + escapeHtml(firstName(p.name)) + ",</p>" +
    "<p>Thank you for reaching out. I received your message and I will reply to you by email as soon as I can.</p>" +
    '<p style="margin:18px 0 6px;color:#555">Here is a copy of what you sent:</p>' +
    '<blockquote style="margin:0;padding:10px 14px;border-left:3px solid #c8f169;background:#f6f5f1;white-space:pre-wrap">' +
    "<strong>" + escapeHtml(p.projectType) + "</strong>\n\n" + escapeHtml(p.message) + "</blockquote>" +
    "<p>Best regards,<br><strong>" + escapeHtml(OWNER_NAME) + '</strong><br><a href="' + SITE_URL + '">' + SITE_URL + "</a></p>" +
    "</div>";

  MailApp.sendEmail({ to: p.email, subject: subject, body: text, htmlBody: html, replyTo: OWNER_EMAIL, name: OWNER_NAME });
}

// ---------- validation & safety ----------

function clean(raw) {
  return {
    id: oneLine(raw.id, 80),
    name: oneLine(raw.name, 120),
    email: oneLine(raw.email, 200).toLowerCase(),
    subject: oneLine(raw.subject, 200),
    budget: oneLine(raw.budget, 100),
    projectType: oneLine(raw.projectType, 100),
    timeline: oneLine(raw.timeline, 100),
    message: String(raw.message || "").trim().slice(0, MAX_MESSAGE_LENGTH),
    source: oneLine(raw.source, 100),
    pageUrl: oneLine(raw.pageUrl, 300),
    userAgent: oneLine(raw.userAgent, 300),
    submittedAt: oneLine(raw.submittedAt, 40),
  };
}

// Strips line breaks so visitors cannot inject extra email headers.
function oneLine(value, max) {
  return String(value == null ? "" : value).replace(/[\r\n]+/g, " ").trim().slice(0, max);
}

function validate(p) {
  if (p.name.length < 2) return "Please enter your name.";
  if (!/^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]{2,}$/.test(p.email)) return "Please enter a valid email address.";
  if (p.message.length < 10) return "Please write a slightly longer message.";
  return "";
}

function isThrottled(email) {
  const cache = CacheService.getScriptCache();
  const key = "sent:" + email;
  if (cache.get(key)) return true;
  cache.put(key, "1", 120); // one message per address every 2 minutes
  return false;
}

function withinDailyLimit() {
  const props = PropertiesService.getScriptProperties();
  const key = "autoreplies:" + Utilities.formatDate(new Date(), "UTC", "yyyy-MM-dd");
  const count = Number(props.getProperty(key) || 0);
  if (count >= MAX_AUTO_REPLIES_PER_DAY) return false;
  props.setProperty(key, String(count + 1));
  return true;
}

function tryRun(fn) {
  try { fn(); return true; } catch (error) { console.error(error); return false; }
}

function firstName(name) { return String(name).split(" ")[0] || "there"; }

function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// ---------- plumbing ----------

function readPayload(e) {
  if (e && e.parameter && Object.keys(e.parameter).length > 0) return e.parameter;
  if (e && e.postData && e.postData.contents) {
    try { return JSON.parse(e.postData.contents); } catch (error) { return parseUrlEncoded(e.postData.contents); }
  }
  return {};
}

function ensureSheet() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);

  const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  if (firstRow.every(function (cell) { return !cell; })) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function parseUrlEncoded(text) {
  return text.split("&").reduce(function (acc, pair) {
    const parts = pair.split("=");
    const key = decodeURIComponent(parts[0] || "");
    const value = decodeURIComponent((parts[1] || "").replace(/\+/g, " "));
    if (key) acc[key] = value;
    return acc;
  }, {});
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

// ---------- run these from the Apps Script editor ----------

// Run once: makes Google ask you to allow the script to send email.
function authorizeEmail() {
  MailApp.sendEmail(OWNER_EMAIL, "Contact form email permission granted", "Your portfolio contact form can now send email.");
}

// Sends a full test (sheet row + email to you + confirmation to you).
function testSubmission() {
  const result = doPost({
    parameter: {
      id: Utilities.getUuid(),
      name: "Test Visitor",
      email: OWNER_EMAIL,
      subject: "Apps Script test",
      budget: "Not specified",
      projectType: "Full Stack Web App",
      timeline: "Not specified",
      message: "If you see this row and two emails, your contact form backend works.",
      source: "Apps Script manual test",
      pageUrl: "manual-test",
      userAgent: "Apps Script",
      submittedAt: new Date().toISOString(),
    },
  });
  console.log(result.getContent());
}
