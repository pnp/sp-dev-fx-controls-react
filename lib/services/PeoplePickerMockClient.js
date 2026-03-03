export var MockUsers = [{
        id: "10dfa208-d7d4-4aef-a7ea-f9e4bb1b85c1",
        imageUrl: "",
        imageInitials: "RF",
        text: "Roger Federer",
        secondaryText: "roger@tennis.onmicrosoft.com",
        tertiaryText: "",
        optionalText: "",
        loginName: "roger@tennis.onmicrosoft.com"
    },
    {
        id: "10dfa208-d7d4-4aef-a7ea-f9e4bb1b85c2",
        imageUrl: "",
        imageInitials: "RN",
        text: "Rafael Nadal",
        secondaryText: "rafael@tennis.onmicrosoft.com",
        tertiaryText: "",
        optionalText: "",
        loginName: "rafael@tennis.onmicrosoft.com"
    },
    {
        id: "10dfa208-d7d4-4aef-a7ea-f9e4bb1b85c3",
        imageUrl: "",
        imageInitials: "ND",
        text: "Novak Djokovic",
        secondaryText: "novak@tennis.onmicrosoft.com",
        tertiaryText: "",
        optionalText: "",
        loginName: "novak@tennis.onmicrosoft.com"
    },
    {
        id: "10dfa208-d7d4-4aef-a7ea-f9e4bb1b85c4",
        imageUrl: "",
        imageInitials: "JP",
        text: "Juan Martin del Potro",
        secondaryText: "juanmartin@tennis.onmicrosoft.com",
        tertiaryText: "",
        optionalText: "",
        loginName: "juanmartin@tennis.onmicrosoft.com"
    }
];
var PeoplePickerMockClient = /** @class */ (function () {
    function PeoplePickerMockClient() {
        this.filterPeople = function (value, index, ar) {
            if (value.secondaryText.toLowerCase().indexOf(this.valToCompare.toLowerCase()) !== -1 || value.text.toLowerCase().indexOf(this.valToCompare.toLowerCase()) !== -1) {
                return true;
            }
            else {
                return false;
            }
        };
    }
    return PeoplePickerMockClient;
}());
export { PeoplePickerMockClient };
//# sourceMappingURL=PeoplePickerMockClient.js.map