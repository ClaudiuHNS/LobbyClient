<template>
    <div class="c-welcome">
        <div v-if="this.currentStep <= 0">
            <h1>Welcome to League Sandbox</h1>
            <div class="c-description">
                <p>An open source community project from and for League Of Legends Fans.</p>
                <p>League Sandbox will support Version 4.20 of the League Of Legends Client.</p>
                <p>It is designed to be decentralized and every player can host their own Lobby Server.</p>
                <br />
                <p>If you want to contribute, check us out on <a href="#">GitHub</a> and feel free to join our development related <a href="">Discord</a></p>
                <strong><p>Since this your first time running our client, would you like to download the required League Of Legends Client ?</p></strong>
                <div class="c-choice">
                    <Button @click="changeStep(1)" text="YES" subtext="Download and Install the 4.20 Client" />
                    <span class="divider"></span>
                    <Button @click="changeStep(2)" text="NO" subtext="I already have the 4.20 Client" />
                </div>
            </div>
        </div>
        <div v-else-if="this.currentStep == 1">
            <h1>Step 2 - Download and Install</h1>
            <div class="c-description">
                <p>We will now install the League Of Legends 4.20 Client for your...</p>
                <strong><p style="font-size:24px;">While waiting, why not follow us on social media and join our Discord Community</p></strong>
                <div class="progress-info">
                    <div class="progress-left" style="width:50%;">
                        <h2>{{progress}}%</h2>
                    </div>
                    <div class="progress-right" style="width:50%;">
                        <p>4.20 MB/s</p>
                        <p>(1,20MB of 2GB)</p>
                        <p>Estimated Time: 4 Animes</p>
                    </div>
                </div>
                <div class="progressbar-border">
                    <div class="fill" v-bind:style="{ width: progress + '%' }"></div>
                </div>
                <div class="c-choice">
                    <Button @click="changeStep(0)" text="Cancel"/>
                    <Button @click="changeProgress" text="START DOWNLOAD" />
                </div>
            </div>
        </div>
        <div v-else-if="this.currentStep == 2">
            <h1>Step 2 - Already Installed</h1>
            <div class="c-description">
                <p>Oh, apparently you have the 4.20 Client already installed?</p>
                <p>You are an experienced user, aren't you ( ͡° ͜ʖ ͡°)</p>
                <strong><p style="font-size:29px;">Please select the folder where your League Of Legends.exe file is placed, to verify your existent installation:</p></strong>
                <div class="c-folder">
                    <input type="text" @change="onChangeInput" name="outputDir" placeholder="Please select or input a path" v-bind:value="this.path"/>
                    <label for="outputDir">Select</label>
                    <input type="file" @change="onChangeFileInput" id="outputDir" class="file-selector-hide" webkitdirectory="" directory=""/>
                </div>
                <div class="c-choice">
                    <Button @click="changeStep(0)" text="Cancel"/>
                    <Button @click="finishPath(0)" :disabled="this.path == null" text="Next" subtext="Select a folder to continue"/>
                </div>
            </div>
        </div>
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
    export default class Welcome extends Vue {
        private currentStep: number = 2;
        private progress: number = 0;
        private host!: string;
        private port!: string;
        private path!: string;

        public data() {
            return {
                host: localStorage.getItem('host'),
                port: localStorage.getItem('port'),
                path: localStorage.getItem('path'),
            };
        }

        private changeStep(step: number): void {
            this.currentStep = step;
        }

        private onChangeInput(event: any): void {
            const input = event.target;
            if(input.value != "")
                this.path = input.value;
            else
                this.path = null;
        }

        private onChangeFileInput(event: any): void {
            const input = event.target;
            if (input.files && input.files[0]) {
                this.path = input.files[0].path;
            }
        }

        private changeProgress(): void {
            if (this.progress === 0) {
                this.progress = 100;
            } else {
                this.$router.replace(this.$route.params.wantedRoute || { name: 'login' });
            }
        }

        private finishPath(): void {
            //CHECK PATH ?
            localStorage.setItem("path", this.path);
            this.$router.replace(this.$route.params.wantedRoute || { name: 'login' });
        }
    }
</script>

<style lang="scss">
    .c-content{
        display: flex;
        align-items: center;
        justify-content: center;
    }
.c-welcome {
    font-family: 'Beaufort';
    width: 75%;
    margin-right: auto;
    margin-left: auto;
    z-index: 9;
    position: relative;
    text-align:center;
    h1{
        font-weight:bold;
        border-bottom:2px solid #d5b26e;
        font-size:48px;
        padding:30px;
        padding-top:0;
        margin-bottom:20px;
        margin-top:0;
    }
    p{
        font-size:21px;
        margin:7px 0;
        a{
            color:#e6b045;
            &:hover{
                color:#9C772F;
            }
        }
    }
    strong{
        p {
            font-size: 32px;
            line-height: 36px;
            margin: 35px auto 40px auto;
            color:#e6b045;
            width:90%;
        }
    }
    .progress-info{
        display:flex;
        justify-content: space-around;
        margin-bottom:40px;
        h2{
            color:white;
            font-size:42px;
        }
    }
    .progressbar-border{
        height: 50px;
        background-color: #313131;
        border: 2px solid #463714;
        margin-bottom: 40px;
        position:relative;
        &:before{
            display: block;
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            box-shadow: inset 0 0 15px 0px #000000;
            z-index: 5;
        }
        .fill{
            height:46px;
            transition:0.5s all ease-out;
            background: linear-gradient(to right, #023860 , #0c8dc0);
            &:after{
                content: '';
                display: block;
                width: 100%;
                height: 100%;
                position: relative;
                top: 0;
                left: 0;
                background: url(https://lolstatic-a.akamaihd.net/frontpage/apps/prod/multistep-signup/en_US/2af725f927413a425b4bed760127010434536ba0/assets/img/button-bg-pattern.png) repeat-x top left;
                background-size: auto 100%;
                background-position: 0 0;
                animation: movingBG 100s linear infinite;
            }
        }
    }
    .c-folder{
        margin:auto;
        margin-bottom:50px;
        width:65%;
        display:flex;

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
            padding:10px;
            height:56px;
            line-height:31px;
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
            padding: 8px 30px 8px 10px;
            border-radius: 0;
            -webkit-transition: all .2s;
            transition: all .2s;
        }
    }
    .c-choice{
        display: flex;
        justify-content: space-around;
        .divider{
            width:2px;
            height:62px;
            background-color:#e6b045;
        }
        button{
            width:40%;
            small{
                font-size:12px;
                font-weight:bold;
                text-transform: none;
            }
        }
    }

}
</style>