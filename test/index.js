import chai from 'chai';
import chaiSpies from 'chai-spies';
chai.use(chaiSpies).should();
import provisionEditorConfig from '../src/';
describe('provisionEditorConfig', () => {

  it('returns an object with `.editoconfig.contents` function', () => {
    provisionEditorConfig()
      .should.be.an('object')
      .with.keys([ '.editorconfig' ])
      .with.property('.editorconfig')
        .with.keys([ 'contents' ])
        .with.property('contents')
          .that.is.a('function');
  });

  describe('contents function', () => {
    let subFunction = null;
    beforeEach(() => {
      subFunction = provisionEditorConfig()['.editorconfig'].contents;
    });

    it('returns an ini file with sensible defaults', () => {
      subFunction('').should.equal(
`root = true

[*]
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
charset = utf-8
indent_style = space
indent_size = 2
`);
    });

    it('extends the original files contents', () => {
      subFunction('root = false\n[*.md]\ntrim_trailing_whitespace = false').should.equal(
`root = true

[*]
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
charset = utf-8
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false
`);
    });

    it('allows for overriding of defaults', () => {
      subFunction = provisionEditorConfig({ '*': { 'indent_size': 4 } })['.editorconfig'].contents;
      subFunction('').should.equal(
`[*]
indent_size = 4
`);
    });

  });

});
