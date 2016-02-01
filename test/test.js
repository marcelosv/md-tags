'use strict';

let mdTags = require('..');
let assert = require('assert');
let should = require('should');

const post = `
# Title

_January 30, 2016_

#nodejs, #markdown, #my-tag`;

const post2 = `
# Title

_January 31, 2016_

#my-tag`;

const post3 = `
# Title

_January 31, 2016_`;

let posts = [];
posts.push(post,post2,post3);

describe('md-tags', function() {
    it('md-tags should be a function and have 2 public methods', function () {
        var mdtags = mdTags();
        mdtags.should.be.a.Function;
        mdtags.should.have.property('tagsForPost');
        mdtags.tagsForPost.should.be.a.Function;
        mdtags.should.have.property('postsForTag');
        mdtags.postsForTag.should.be.a.Function;
    });
    describe('tagsForPost', function() {
        it('should return empty string when parameters are empty', function () {
            assert.equal(undefined, mdTags().tagsForPost());
            assert.equal(undefined, mdTags().tagsForPost(null));
        });
        it('should return text', function () {
            assert.equal("nodejs, markdown, my-tag",
                mdTags().tagsForPost(post).text
            )
        });
        it('should return list of tags', function () {
            assert.deepEqual(["nodejs", "markdown", "my-tag"],
                mdTags().tagsForPost(post).list
            )
        });
    });
    describe('postsForTag', function() {
        it('should return empty string when parameters are empty', function () {
            assert.deepEqual([], mdTags().postsForTag());
            assert.deepEqual([], mdTags().postsForTag(null));
        });
        it('should return not empty list', function () {
            mdTags().postsForTag("my-tag", posts).should.be.instanceof(Array).and.have.lengthOf(2);            
        });
        it('should return empty list', function () {
            mdTags().postsForTag("not-matched-tag", posts).should.be.instanceof(Array).and.have.lengthOf(0);        
        });
    });
});