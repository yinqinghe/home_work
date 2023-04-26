import {observable} from 'mobx-miniprogram'
import {Observable,action} from 'mobx-miniprogram'

export const store=Observable({
        numA:1,
        active:'',

        change_active:action(function(active){
            this.active=active
        })
    })