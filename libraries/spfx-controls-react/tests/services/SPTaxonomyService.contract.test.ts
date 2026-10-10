import * as ts from 'typescript';
import * as path from 'path';

test('published getTermById requires strict consumers to handle undefined', () => {
  const filename = path.join(__dirname, 'taxonomy-contract-consumer.ts');
  const source = `
    import { SPTaxonomyService } from '../../lib/services/SPTaxonomyService';
    import { ITermInfo } from '../../lib/services/SPTaxonomyService.types';
    import { Guid } from '@microsoft/sp-core-library';
    declare const service: SPTaxonomyService;
    async function unsafe(): Promise<ITermInfo> {
      return service.getTermById(Guid.empty, Guid.empty);
    }
    async function safe(): Promise<string | undefined> {
      const term = await service.getTermById(Guid.empty, Guid.empty);
      return term?.id;
    }
  `;
  const options: ts.CompilerOptions = {
    strictNullChecks: true, skipLibCheck: true, noEmit: true,
    target: ts.ScriptTarget.ES2019, module: ts.ModuleKind.CommonJS,
    moduleResolution: ts.ModuleResolutionKind.Node10, types: []
  };
  const host = ts.createCompilerHost(options);
  const getSourceFile = host.getSourceFile.bind(host);
  host.getSourceFile = (name, languageVersion, onError, shouldCreateNewSourceFile) =>
    name === filename ? ts.createSourceFile(name, source, languageVersion, true)
      : getSourceFile(name, languageVersion, onError, shouldCreateNewSourceFile);
  const program = ts.createProgram([filename], options, host);
  const errors = ts.getPreEmitDiagnostics(program).filter(error => error.file?.fileName === filename);
  expect(errors).toHaveLength(1);
  expect(errors[0].code).toBe(2322);
  expect(ts.flattenDiagnosticMessageText(errors[0].messageText, '\n')).toContain('undefined');
});
