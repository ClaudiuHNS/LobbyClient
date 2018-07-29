<template>
    <button class="o-button">
        {{ text }}
    </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
  @Prop() private text!: string;
}
</script>

<style scoped lang="scss">
.o-button {
    display: inline-block;
    padding: 15px 25px;
    background: linear-gradient(180deg,#ecc572 0,#815500);
    font-family: Beaufort,serif;
    font-size: 1.0rem;
    font-weight: 400;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #937341;
    cursor: pointer;
    line-height: 1;
    border: none;
    position: relative;
    z-index: 1;
    box-shadow: 0 0 25px rgba(0,0,0,.11);
    transition: color .2s;
    max-width: 100%;
}

.o-button::before {
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    content: "";
    display: block;
    position: absolute;
    background: #111;
    z-index: -1;
}

.o-button:hover {
    color:#c4b998
}
</style>