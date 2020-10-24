import { action, comparer, computed, makeObservable, observable, } from "mobx"

export class StoreCompatibility {

    selectedCompatibility: [boolean, boolean, boolean, boolean] = [false, false, false, false]

    clearSelectedCompatibility() {
        this.selectedCompatibility = [false,false,false, false]
    }
    changeSelectedCompatibility(index: number) {
        if (this.selectedCompatibility[index]) {
            this.selectedCompatibility[index] = false
        } else {
            this.selectedCompatibility[index] = true
        }

    }
    isVisible: boolean = false

    setVisible() {
        this.isVisible ? this.isVisible = false : this.isVisible = true
    }
    constructor() {
        makeObservable(this, {
            selectedCompatibility: observable,
            changeSelectedCompatibility: action,
            clearSelectedCompatibility: action,
            isVisible: observable,
            setVisible: action,
        
        })
    }
}
export const storeCompatibility = new StoreCompatibility()