<template>
    <div>
        <md-dialog :md-active.sync="showDialog" class="c-settings">
            <md-dialog-title>Settings</md-dialog-title>

            <div>
                <div class="c-settings__input">
                    <label>Path to League of Legends :</label>
                    <div class="c-settings__path">
                        <input type="text" name="outputDir" placeholder="Please select or input a path"/>
                        <label for="outputDir">Select</label>
                        <input type="file" id="outputDir" class="file-selector-hide" webkitdirectory="" directory="" />
                    </div>
                </div>
                <div class="c-settings__packages">
                    Packages installed :
                    <div v-for="installedPackage in Object.keys(installedPackages)" :key="installedPackage">
                        {{ installedPackage }} : {{ installedPackages[installedPackage] }} <Button text="Delete" />
                    </div>
                </div>
            </div>

            <md-dialog-actions>
                <Button @click="showDialog = false" text="Cancel" />
                <Button @click="showDialog = false" text="Save" />
            </md-dialog-actions>
        </md-dialog>

        <li class="c-controll" @click="open()"><font-awesome-icon icon="cog" /></li>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Button from '@/components/Button.vue';

@Component({
    components: {
        Button,
    },
})
export default class Settings extends Vue {
    private showDialog!: boolean;
    private path!: string;
    private installedPackages!: any;

    public data() {
        return {
            installedPackages: this.$store.state.installedPackages.installed || {},
            showDialog: false,
            path: localStorage.getItem('path'),
        };
    }

    public open() {
        this.showDialog = true;
        this.installedPackages = this.$store.state.installedPackages.installed;
        this.path = localStorage.getItem('path') as string;
    }
}
</script>

<style lang="scss">
.c-settings {
    color: #F0E6D2;
    font-family: 'Beaufort';
    text-transform: uppercase;
    width: 768px;
    background-color: #010A13;
    border: 2px solid #1D2126;
    padding: 10px;

    .c-settings__path {
        display: flex;
    }
    
    .file-selector-hide{
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }

    label[for="outputDir"]{
        text-align:center;
        width:150px;
        font-size: 1.25em;
        padding:0 5px;
        height:35px;
        line-height:35px;
        text-transform:uppercase;
        border: 1px solid #785b28;
        font-weight: 700;
        color: white;
        background-color: #1f3958;
        cursor:pointer;
        transition:0.2s all;
        background: url(https://lolstatic-a.akamaihd.net/frontpage/apps/prod/multistep-signup/en_US/2af725f927413a425b4bed760127010434536ba0/assets/img/button-bg-pattern.png) repeat-x top left;
        background-size: auto 100%;
        background-position: 0 0;
        animation: movingBG 1000s linear infinite;
        &:hover{
            background-color: #27456c;
        }
    }
    
    input[type="text"]{
        color: #f0e6d2;
        text-align:center;
        width:100%;
        font-family: 'Beaufort';
        background-color: #000;
        background: #1e2328;
        border: 1px solid #785b28;
        box-shadow: inset 0 3px 5px rgba(1,10,19,.5);
        padding: 3px 30px 3px 10px;
        border-radius: 0;
        -webkit-transition: all .2s;
        transition: all .2s;
        font-size: 1.25em;
    }
}
</style>
