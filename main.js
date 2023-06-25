const SortingTypes = {
    AscendingNumbers: 0,
    DescendingNumbers: 1,
    AlphabeticalOrder: 2,
    ReverseAlphabeticalOrder: 3,
};

const App = {
    data() {
        return {
            editorBusy: false,
            nextId: 1,
            inputValue: "",
            tempText: "",
            sortingIndexNow: SortingTypes.AscendingNumbers,
            sortings: [
                "Ascending numbers",
                "Descending numbers",
                "In alphabetical order",
                "In reverse alphabetical order",
            ],
            items: [],
        };
    },
    methods: {
        addNewItem(event) {
            event.preventDefault();

            if (!checkNameValidity(this.inputValue)) {
                alertInvalidName();
                return;
            }
            const text = this.inputValue.trim();
            this.items.push({
                text: text,
                id: this.nextId,
                isEdited: false,
                inputValue: text,
            });
            this.inputValue = "";
            this.nextId++;
            this.sortList();
        },
        changeSorting(index) {
            this.sortingIndexNow = index;
            this.sortList();
        },
        sortList() {
            if (this.items.length < 2) return;

            switch (this.sortingIndexNow) {
                case SortingTypes.AscendingNumbers:
                    this.items.sort((a, b) => a.id - b.id);
                    break;
                case SortingTypes.DescendingNumbers:
                    this.items.sort((a, b) => b.id - a.id);
                    break;
                case SortingTypes.AlphabeticalOrder:
                    this.items.sort((a, b) => a.text.localeCompare(b.text));
                    break;
                case SortingTypes.ReverseAlphabeticalOrder:
                    this.items.sort((a, b) => b.text.localeCompare(a.text));
                    break;
                default:
                    break;
            }
        },
        removeItem(event, id) {
            const arrIndex =
                event.target.closest("li").getAttribute("data-id") - 1;
            this.items.splice(arrIndex, 1);
            this.nextId--;
        },
        activeEditing(item) {
            if (this.editorBusy) return;
            this.editorBusy = true;
            item.isEdited = true;
            this.tempText = item.inputValue;
        },
        acceptRenaming(item) {
            item.isEdited = false;
            if (checkNameValidity(item.inputValue)) {
                item.text = item.inputValue;
                this.sortList();
            } else {
                item.inputValue = this.tempText;
                alertInvalidName();
            }
            this.editorBusy = false;
        },
        cancelRenaming(item) {
            item.isEdited = false;
            item.inputValue = this.tempText;
            this.editorBusy = false;
        },
    },
};

const app = Vue.createApp(App);

app.mount("#app");

function checkNameValidity(name) {
    const re = /[^ ]+/;
    return re.test(name);
}

function alertInvalidName() {
    alert(
        "Please enter a valid item (non-empty and not consisting of only spaces)"
    );
}