import { IPeoplePickerUserItem } from "../PeoplePicker";

export const MockUsers : IPeoplePickerUserItem[] = [{
    id: "10dfa208-d7d4-4aef-a7ea-f9e4bb1b85c1",
    imageUrl: "",
    imageInitials: "RF",
    text: "Roger Federer",
    secondaryText: "roger@tennis.onmicrosoft.com",
    tertiaryText: "",
    optionalText: ""
  },
  {
    id: "10dfa208-d7d4-4aef-a7ea-f9e4bb1b85c2",
    imageUrl: "",
    imageInitials: "RN",
    text: "Rafael Nadal",
    secondaryText: "rafael@tennis.onmicrosoft.com",
    tertiaryText: "",
    optionalText: ""
  },
  {
    id: "10dfa208-d7d4-4aef-a7ea-f9e4bb1b85c3",
    imageUrl: "",
    imageInitials: "ND",
    text: "Novak Djokovic",
    secondaryText: "novak@tennis.onmicrosoft.com",
    tertiaryText: "",
    optionalText: ""
  },
  {
    id: "10dfa208-d7d4-4aef-a7ea-f9e4bb1b85c4",
    imageUrl: "",
    imageInitials: "JP",
    text: "Juan Martin del Potro",
    secondaryText: "juanmartin@tennis.onmicrosoft.com",
    tertiaryText: "",
    optionalText: ""
  }
];

export class PeoplePickerMockClient {
  public filterPeople = function(value : any, index : number, ar : any[]) {
    if (value.secondaryText.toLowerCase().indexOf(this.valToCompare.toLowerCase()) !== -1 || value.text.toLowerCase().indexOf(this.valToCompare.toLowerCase()) !== -1) {
      return true;
    } else {
      return false;
    }
  };
}
