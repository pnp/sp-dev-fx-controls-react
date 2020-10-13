import Icons from '@uifabric/icons/lib/data/AllIconNames.json';

interface IFluentIcon {
  name: string;
  unicode: string;
}

const icons: IFluentIcon[] = Icons.slice(1) as IFluentIcon[];

export class FluentIconsService {
  private _iconNames: string[];

  constructor() {
    this._iconNames = icons.map(icon => icon.name).sort();
  }

  public getAll = (): string[] => {
    return this._iconNames;
  }

  public search = (query: string, startsWith?: boolean): string[] => {
    const lowerCasedQuery = query.toLowerCase();
    return this._iconNames.filter(name => startsWith === false ? name.toLowerCase().indexOf(lowerCasedQuery) !== -1 : name.toLowerCase().indexOf(query) === 0);
  }
}


