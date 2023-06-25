const SortingTypes = {
    AscendingNumbers: 0,
    DescendingNumbers: 1,
    AlphabeticalOrder: 2,
    ReverseAlphabeticalOrder: 3,
};

const app = Vue.createApp({
    data: () => ({
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
    }),
    methods: {
        addNewItem() {
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
        },
        removeItem(item) {
            const itemIndex = this.items.indexOf(item);
            this.items.splice(itemIndex, 1);
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
    computed: {
        sortedItems() {
            switch (this.sortingIndexNow) {
                case SortingTypes.AscendingNumbers:
                    return this.items.sort((a, b) => a.id - b.id);
                case SortingTypes.DescendingNumbers:
                    return this.items.sort((a, b) => b.id - a.id);
                case SortingTypes.AlphabeticalOrder:
                    return this.items.sort((a, b) =>
                        a.text.localeCompare(b.text)
                    );
                case SortingTypes.ReverseAlphabeticalOrder:
                    return this.items.sort((a, b) =>
                        b.text.localeCompare(a.text)
                    );
            }
        },
    },
});

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
