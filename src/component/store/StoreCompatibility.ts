import { action, comparer, computed, makeObservable, observable, } from "mobx"
import { RefObject, useRef } from "react"
import { ScrollView } from "react-native-gesture-handler"

export class StoreCompatibility {

    selectedCompatibility: [boolean, boolean, boolean, boolean] = [false, false, false, false]

    clearSelectedCompatibility() {
        this.selectedCompatibility = [false, false, false, false]
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
    rotate: [string, string, string, string] = ['90deg', '90deg', '90deg', '90deg']
    
    setRotate(index: number) {
        this.selectedCompatibility[index] ? this.rotate[index] = '0deg' : this.rotate[index] = '90deg'
    }

    scrollRef: RefObject<ScrollView> = undefined
    isScrollRef(){
        this.scrollRef?.current?.scrollToEnd({animated: true})
    }
    
    animatedCompatibility: [boolean, boolean, boolean, boolean] = [false, false, false, false]
    
    changeAnimatedCompatibility (index: number){
        this.animatedCompatibility[index]? this.animatedCompatibility[index]= false : this.animatedCompatibility[index] = true
    }

    constructor() {
        makeObservable(this, {
            selectedCompatibility: observable,
            changeSelectedCompatibility: action,
            clearSelectedCompatibility: action,
            isVisible: observable,
            setVisible: action,
            rotate: observable,
            setRotate: action,
            scrollRef: observable,
            isScrollRef: action,
            animatedCompatibility: observable,
            changeAnimatedCompatibility: action,
        })
    }
}
export const storeCompatibility = new StoreCompatibility()