export {};
import { ICultureInfo, ICultureNumberFormat } from '../SPEntities';
declare global {
    interface String {
        parseNumberInvariant(): number;
        _parseNumber(culture: ICultureInfo): number;
        _parseNumberNegativePattern(numberFormat: ICultureNumberFormat, pattern: number): string[];
    }
}
//# sourceMappingURL=String.extensions.d.ts.map