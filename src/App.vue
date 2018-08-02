<template>
  <div id="app">
    <div v-if="this.$store.state.logged" class="c-header__outer">
      <div class="c-header__inner">
        <div class="md-layout">
          <div class="md-layout-item">
            <div class="c-title" style="z-index:9999;">
              League Sandbox
            </div>
          </div>
          <div class="sm-layout-item" style="-webkit-app-region: no-drag;">
            <PlayMenu />
          </div>
          <div class="md-layout-item" style="z-index:9999;-webkit-app-region: no-drag;">
            <ul class="main-nav">
              <li>Home</li>
              <li>Lobbies</li>
              <li>Masteries</li>
              <li>Runes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="c-content">
      <router-view/>
    </div>
    <div v-if="this.$store.state.logged && this.popup.show">
      <div class="c-popup">
        <div class="c-popup__image">
          <img :src="this.popup.image" />
        </div>
        <div class="c-popup__text">
          <div class="c-popup__text__header">{{ this.popup.title }}</div>
          <div class="c-popup__text__content">{{ this.popup.content }}</div>
        </div>
      </div>
    </div>
    <div class="background-component bg-welcome">
    </div>
    <div class="win-controls">
      <div class="dragbar"></div>
      <ul>
        <li onclick="_minimize()">-</li>
        <li class="close" onclick="_close()">X</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PlayMenu from '@/components/PlayMenu.vue';
import UserList from '@/components/UserList.vue';
import url from 'url';
import http from 'http';

@Component({
  components: {
    PlayMenu,
    UserList,
  },
})
export default class App extends Vue {
  private popup!: any;

  public data() {
    return {
      popup: {
        show: false,
        title: '',
        content: '',
        image: '',
      },
    };
  }

  public mounted() {
    (window as any)._ipc.on('lspm', (event: any, args: any) => {
      const packageLink = args;
      let packageInfos = packageLink.replace(/(lspm:\/\/)/, '');
      packageInfos = packageInfos.split('/');
      const hostPackage = packageInfos[0];
      const packageCreator = packageInfos[1];
      const packageName = packageInfos[2];
      const packageVersion = packageInfos[3];

      this.popup = {
        show: true,
        title: 'Downloading package...',
        content: 'Downloading ' + packageName + ' by ' + packageCreator,
        image: '',
      };
      this.installPackage(hostPackage, packageCreator, packageName, packageVersion);
    });
    (window as any)._installPackage = this.installPackage;
  }

  public installPackage(host: string, packageCreator: string, packageName: string, packageVersion: string) {
    // Starting download

    this.popup = {
      show: true,
      title: 'Downloading package...',
      content: 'Downloading ' + packageName + ' by ' + packageCreator,
      image: '',
    };

    console.log(host, packageCreator, packageName, packageVersion);
    this.downloadPackage(`https://${host}/media/${packageCreator}-${packageName}-${packageVersion}.zip`,
      `${packageCreator}-${packageName}-${packageVersion}.zip`,
      (res: any) => {
        if(res == null) {
          this.popup = {
            show: true,
            title: 'Download complete!',
            content: 'Downloaded ' + packageName + ' by ' + packageCreator,
            image: '',
          };
        }
      }
    );
  }

  private downloadPackage(packageUrl: string, filename: string, callback: any) {
    const fs = (window as any).require('fs');
    const packagesDir = (localStorage.getItem('path') as string) + '/lspm/';
    if (!fs.existsSync(packagesDir)){
      fs.mkdirSync(packagesDir);
    }
    const file = fs.createWriteStream(packagesDir + filename);
    const timeout = 30000;

    const timeoutWrapper = (req: any) => {
      return () => {
        req.abort();
        callback('File transfer timeout!');
      };
    };

    const request = http.get(packageUrl).on('response', (res: any) => {
      const len = parseInt(res.headers['content-length'], 10);
      let downloaded = 0;

      res.on('data', (chunk: any) => {
          file.write(chunk);
          downloaded += chunk.length;
          console.log('Downloading ' + (100.0 * downloaded / len).toFixed(2) + '% ' + downloaded + ' bytes');
          clearTimeout(timeoutId);
          timeoutId = setTimeout(fn, timeout);
      }).on('end', () => {
          clearTimeout(timeoutId);
          file.end();
          callback(null);
      }).on('error', (err: any) => {
          file.emit('error', new Error(http.STATUS_CODES[res.statusCode]));
          clearTimeout( timeoutId );
          callback(err.message);
      });
    });

    const fn = timeoutWrapper(request);
    let timeoutId = setTimeout(fn, timeout);
  }
}
</script>

<style lang="scss">
/* Define a custom web font */
@font-face {
  font-family: 'Spiegel';
  src: url('https://s.lolstatic.com/awesomefonts/1.0.0/Fonts/Spiegel-Regular.woff') format('woff'), 
  url('https://s.lolstatic.com/awesomefonts/1.0.0/Fonts/Spiegel-Bold.woff') format('woff'), 
  url('https://s.lolstatic.com/awesomefonts/1.0.0/Fonts/Spiegel-RegularItalic.woff')  format('woff'),
}

@font-face {
  font-family: 'Beaufort';
  src: url('https://s.lolstatic.com/awesomefonts/1.0.0/Fonts/BeaufortforLOL-Medium.woff') format('woff'), 
  url('https://s.lolstatic.com/awesomefonts/1.0.0/Fonts/BeaufortforLOL-Bold.woff') format('woff'), 
  url('https://s.lolstatic.com/awesomefonts/1.0.0/Fonts/BeaufortforLOL-Italic.woff')  format('woff'),
}

*:focus{
  outline:none;
}

html {
  font-family: 'Beaufort', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #d8cfbd;
  background: #010a13;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
}

body {
  color: #d5b26e;
  height:100%;
  width:100%;
  position:relative;
  #app{
    height:100%;
    width:100%;
    position:relative;
    display:flex;
    flex-direction: column;
    &:before{
      display: block;
      content: "";
      border: 1px solid rgba(255, 255, 255, 0.7);
      opacity: .15;
      position: absolute;
      top: 5px;
      right: 5px;
      bottom: 5px;
      left: 5px;
      box-shadow: 0 0 10px 1px #000000;
    }
    .c-header__outer{
      flex-grow: 0;
      z-index:4;
    }
    .c-content {
      flex-grow: 1;
    }
    .win-controls {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 0;
      display:flex;
      z-index: 999;
      .dragbar{
        width:100%;
        height:16px;
        -webkit-app-region: drag;
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        height: 28px;
        li{
          padding: 10px;
          font-size: 30px;
          line-height: 8px;
          border: 1px solid #463714;
          border-top: 0;
          color: wheat;
          cursor: pointer;
          background: #010a13;
          transition:0.1s all;
          &:hover{
            background-color:#343b42;
          }
        }
        li.close{
          font-size:16px;
        }
      }
    }
  }
}
.c-header__inner {
  color: #f0e6d2;
  height: 64px;
  padding: 2px 0 0 13px;
  &:before {
    display: block;
    content: "";
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-bottom: none;
    height: 60px;
    opacity: .15;
    position: absolute;
    top: 5px;
    right: 5px;
    bottom: 5px;
    left: 5px;
    box-shadow: 0 0 10px 1px #000000;
  }
  ul.main-nav{
    list-style:none;
    padding:0;
    margin:0;
    display:flex;
    justify-content: space-evenly;
    height: 100%;
    margin-top: 3px;
    padding: 1px 76px 0 18px;
    li{
      text-transform: uppercase;
      line-height: 56px;
      font-size: 18px;
      font-weight: bold;
      font-family: 'Beaufort';
      padding: 0 10px 0 9px;
      width: 100%;
      border-left: 1px solid;
      border-right: 1px solid #463714;
      border-image: linear-gradient(to top, #463714, rgba(255, 255, 255, 0.1)) 1 100%;
      text-align: center;
      cursor: pointer;
      transition: 0.2s all;
      &:hover{
        background-color: rgba(255, 255, 255, 0.05);
        box-shadow: inset 0 -10px 15px rgba(0, 243, 255, 0.23);
      }
    }
  }
}

.c-header__outer {
  background: #010a13;
  border-bottom: 1px solid #463714;
  box-shadow: 0 0 50px black;
  z-index: 2;
}

.background-component{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:-100
}
.background-component.bg-welcome:before{
    content:"";
    background:url(https://lolstatic-a.akamaihd.net/frontpage/apps/prod/signup/en_GB/0e436452d44f9a739dfe56d0dffe6c3ca02e63b8/assets/en_GB/assets/bg-welcome.jpg) top;
    background-size:cover;
    display:block;
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    opacity:.15;
    filter:blur(8px);
}
.background-component.bg-welcome:after{
    content:"";
    background:url(https://lolstatic-a.akamaihd.net/frontpage/apps/prod/signup/en_GB/0e436452d44f9a739dfe56d0dffe6c3ca02e63b8/assets/en_GB/assets/bg-welcome.jpg) top;
    background-size:cover;
    display:block;
    opacity:0;
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-button {
  width: 0px;
  height: 0px;
}
::-webkit-scrollbar-thumb {
  background: #785a28;
  border: 0px none #ffffff;
  border-radius: 50px;
}
::-webkit-scrollbar-thumb:hover {
  background: #c8aa6e;
}
::-webkit-scrollbar-thumb:active {
  background: #463714;
}
::-webkit-scrollbar-track {
  background: #010a13;
  border: 0px none #ffffff;
  border-radius: 50px;
}
::-webkit-scrollbar-track:hover {
  background: #010a13;
}
::-webkit-scrollbar-track:active {
  background: #010a13;
}
::-webkit-scrollbar-corner {
  background: transparent;
}

.c-play-button{
  color: #cdfafa;
  border-color: #0596aa;
  background: linear-gradient(to bottom,#0596aa 0,#005a82 100%);
  font-size: 16px;
  font-weight: 700;
  font-family: 'Beaufort';
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: .25rem;
  line-height: 1;
  width: 200px;
  border: none;
  padding: 15px 0;
  position: relative;
  z-index: 1;
  box-shadow: 0 0 25px rgba(0,0,0,.11);
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5px;
  display: block;
}

.c-play-button:hover {
  background: linear-gradient(to bottom,#ecc572 0,#815500 100%);
}

.c-play-button::before {
    content: '';
    display: block;
    position: absolute;
    background: #111;
    z-index: -1;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px
}

.c-play-button::after {
    content: '';
    display: block;
    background: url(https://lolstatic-a.akamaihd.net/frontpage/apps/prod/multistep-signup/en_US/2af725f927413a425b4bed760127010434536ba0/assets/img/button-bg-pattern.png) repeat-x top left;
    background-size: auto 100%;
    background-position: 0 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: .3;
    -webkit-animation: movingBG 500s linear infinite;
    animation: movingBG 500s linear infinite;
    will-change: background-position;
    transition: .4s ease;
    -webkit-animation-play-state: running;
    animation-play-state: running
}

.c-play-button:hover::after {
  opacity: .7;
}

@keyframes movingBG {
  from {
    background-position: 0 0
  }

  to {
    background-position: 10000px 0
  }
}

.c-loader {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  -ms-flex-align: center;
  align-items: center;
  background-color: rgba(17, 17, 17, 0.7);
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: center;
  justify-content: center;
  z-index: 2900000;
}

.c-spinner {
  animation-duration: 12s;
  animation-iteration-count: infinite;
  animation-name: spinner;
  animation-timing-function: linear;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMYAAADGCAMAAAC+RQ9vAAAAHlBMVEVHcEzNv4/Ovo/Nv4/Nv47Nv4/Nv4/Nv47Nv4/Ovo/5YP2YAAAACnRSTlMA/RLbXqU/gcEoouvzmAAABSNJREFUeNrtnet26ygMhbWFbrz/C8+ads6yOeBJ3QQCLd+vkAtmgyRkxwbqAmc6AM4fMK0DcFEQKK1DQm7LcDhNjakchYC1ZSjkKIgazYYgitZeybCzWKHZ4EvbAS6tjWf0B2t7MtBuuSHN4g/cHoGM1JTBSBdDJpppLBfGbYi2hQHN71DM4idy7lw+G0z5ujK26vv5rX6S6g6texqo7agObUrvw6FVoYq4QPNtPUliINNg+PTyKvJ4SFN22EVki+IA/eEIomaX0q0uzeV0InQQwf1lpDI8pXKK/jIGvZhBBImHhCdu9yN/1zgVXvVTdwJeplLPUDu4I2gEBuSiCS+NdxkwGoIWYVaflmFq75hBGLBe0dEA7hd7JUorSP3yAi9EyYtr17IoA7I04kPUa8iA9A7tdbCNlwctKSNSaB8ZGnTgHTpLizp5QMJmPUIvB3T0yb3T68mAU2+6OcaNQe5kxM8jTJXLjUFQ9hnLs8lsmRQOQiFVJP4unEodLDQMqxvypI4OjGvGUcHaKo4q1lZxVLK2iqOaRVSM1zH+4Jyc3oZ/X4U4FTBNQ05yI7cMpikR3EgYLSEZTYgCeu/kAk6zkQMQuoXPZ1gGpHz/R5MZlgPKdBs+hrAXQ8ycHTCaBHnCNkRpGpzpt8H8I1oaSWgJJMX/h4Mwmh6LB7OaJECZpoYVSPI4ysJpYhzAF8JWPsTOxWEu+YsJ7qyZOsetFEmS0pToPTth3hPbZvNBFqblkLD6ZN0zrQR7ArQSBiCEVsEUQBJuzt5IS5ydsCQAag8+nRx/2N+mgNLkKEIee47R5ORMm83m12HCtCwsduRTyY0XlGDnvEoC/xJutBDm/zVb6veUaQlYr3qeRRNAiwAkvXTpbLQIthOSzWazeQ+sLpaZloSzuEYCU8YHKdTFaCFcA3/IxJ96PghaiACA9GFL55xXXJ0WQsT2nx2bzWaz+d3gxMItx4k9AJvNZrPZLAmbCC2EqxcXFbKJa1rwAs9xgY0p4w+hTgthpwtsmfhTz7qXP01c9wWrzWazGcz6N1usf+vLT7oRaf3bwn7UTXrr3zK52Wxezn7I41nMmR4gscJDQVB79CgdfMmH5epP5yd7AqB52Yflrp+3PPIqppXIisqPLWTFfGrfqb7ZSy802rX+Ah3rL5cSRtesv3jN+ksJrb+w0/rLbP30Rc+IeU9s08JO06BC38QShCbBimlg3bVkBYj8vejsNBGWAKOb5ITDopZdS1aAlKkfY8x88Eo8ndbijsKgZjMs/vpUn+dZDp6pwGXlxflX3/Lh8+B744pTNXszlL01zV+N+O0bHlU/NxqG8Mt0CBKXZR2XPgWVOuRFXUIGyEA78qIsnWo+WGtbvkAMzspzj2pHn4Eoovcg84g92BO0h8uN3mA1A9LBMYZvdytAfrVj8PjNh0mRXly9vWMraArpdyrJgHWcLpjesE266dOSsnpZ+fhN60nhT8sAePym9QGvmvAcASmTws7Uwdah350T+Vzlg2S2d2hPsJN92R3T1LqWo596wxFXcR7ItxyiHNODCKb+8IVV20mShVMDCW+OAAOd9mC/H2Mc2jxPBOq3jxBXF8aj0PbIOLwlwxAnSUHFSL4NBnLbMBTSksHla66ytOHUHXouBKwlgwAuv1NXNZ6sQk07ogRuykjI7R+wGk1AFXmoKUOryDYPdctzOZ1cDFmHZLaLn9QypAptk2Gln2glo9YnajQvte2U1rYOCqlkHIVl4MwXLc9MPfgHhC4YftVqJ4sAAAAASUVORK5CYII=);
  background-size: cover;
  height: 75px;
  position: relative;
  width: 75px;
  z-index: 2910000;
}

@keyframes spinner {
    0% {
        transform: rotate(0deg)
    }

    to {
        transform: rotate(1turn)
    }
}

.c-title {
  font-family: 'Beaufort';
  padding-left: 5px;
  line-height: 60px;
  font-size: 30px;
}

</style>
