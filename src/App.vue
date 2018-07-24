<template>
  <div id="app">
    <div>
      <div class="c-header__outer">
        <div class="c-header__inner">
          League Sandbox client
        </div>
      </div>
      <router-view/>
      <div class="background-component bg-welcome">
      </div>
    </div>
  </div>
</template>

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

html {
  font-family: 'Beaufort', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #d8cfbd;
  background: #010a13;
}

body {
  color: #d5b26e;
}

.c-header__inner {
  color: #f0e6d2;
  font-size: 2rem;
  height: 50px;
  padding: 12px;
}

.c-header__outer {
  background: #010a13;
  border-bottom: 1px solid #463714;
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
    filter:blur(8px)
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

</style>
