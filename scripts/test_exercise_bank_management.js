#!/usr/bin/env node
const assert = require('node:assert/strict');
const fs = require('node:fs');

const html = fs.readFileSync('index.html', 'utf8');
const app = fs.readFileSync('app.js', 'utf8');

assert.match(html, /id="exerciseManagement"/, 'management panel container should exist');
assert.match(html, /id="exerciseType"/, 'exercise type selector should exist');
assert.match(html, /id="exerciseChapterChips"/, 'chapter filter chips should exist');
assert.match(html, /href="\.\/assets\/pdfs\/exercise_questions_parsed\.json"/, 'JSON download link should exist');

assert.match(app, /function getExerciseType/, 'type classifier should be defined');
assert.match(app, /function renderExerciseManagement/, 'management renderer should be defined');
assert.match(app, /exerciseType/, 'type selector should be wired into filtering');
