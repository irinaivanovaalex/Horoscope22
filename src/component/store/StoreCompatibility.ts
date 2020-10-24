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
    
    changeAnimatedCompatibility (){
        this.animatedCompatibility[0]? this.animatedCompatibility[0]= false : this.animatedCompatibility[0] = true
        this.animatedCompatibility[1]? this.animatedCompatibility[1]= false : this.animatedCompatibility[1] = true
        this.animatedCompatibility[2]? this.animatedCompatibility[2]= false : this.animatedCompatibility[2] = true
        this.animatedCompatibility[3]? this.animatedCompatibility[3]= false : this.animatedCompatibility[3] = true
    }
    clearAnimatidCompatybility(){
        this.animatedCompatibility = [false, false, false, false]
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
            clearAnimatidCompatybility: action
        })
    }
}
export const storeCompatibility = new StoreCompatibility()