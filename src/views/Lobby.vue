<template>
    <div class="c-lobby">
        <div class="c-lobby__infos">
            <div class="c-lobby__name">{{ lobby.name }}</div>
            <div class="c-lobby__gamemode">Summoner's Rift - 5v5 - Blind pick</div>
        </div>
        <div class="md-layout">
            <div class="md-layout-item">
                <div class="c-lobby__team__name">Order</div>
                <div class="c-lobby__order">
                    <div v-for="i in 6" :key="i"
                        class="c-lobby__player">
                        Empty
                    </div>
                </div>
            </div>
            <div class="md-layout-item">
                <div class="c-lobby__team__name">Chaos</div>
                <div class="c-lobby__chaos">
                    <div v-for="i in 6" :key="i"
                        class="c-lobby__player">
                        Empty
                    </div>
                </div>
            </div>
        </div>
        <div class="md-layout">
            <div class="md-layout-item">
                <div class="c-lobby__chat">
                    <div class="c-lobby__chat__messages">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                    <input class="c-lobby__chat__input" type="text" />
                </div>
            </div>
            <div class="md-layout-item">
                <div class="c-lobby__actions">
                    <Button text="back" @click="back()" />
                    <Button text="settings" />
                    <Button text="start" />
                </div>
            </div>
            <div class="md-layout-item">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import NetworkService from '../services/networkService';

@Component({
    components: {
        Button,
    },
})
export default class Lobby extends Vue {
    private lobby!: lobby.Lobby;

    public data() {
        return({
            lobby: NetworkService.lobby,
        });
    }

    public created() {
        if (!NetworkService.lobbyConnection) {
            this.$router.replace(this.$route.params.wantedRoute || { name: 'login' });
        }
    }

    public back() {
        // Disconnect
        NetworkService.disconnect();
        this.$router.replace(this.$route.params.wantedRoute || { name: 'login' });
    }
}
</script>

<style lang="scss">
.c-lobby {
    display: flex;
    flex-grow: 1;
    flex-direction: column;

    .c-lobby__team__name {
        margin-left: 40px;
        font-size: 20px;
        font-weight: 700;
    }

    .c-lobby__order {
        width: 100%;
        padding: 0 10px 0 20px;
    }

    .c-lobby__chaos {
        width: 100%;
        padding: 0 20px 0 10px;
    }

    .c-lobby__player {
        border-bottom: 1px rgba(55, 55, 55, 0.4) solid;
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
    }

    .c-lobby__actions {
        display: flex;
        justify-content: center;
        margin-top: 15px;
    }

    .c-lobby__infos {
        margin-left: 40px;

        .c-lobby__name {
            font-size: 30px;
            font-weight: 700;
            margin: 0 3px;
            color: #f0e6d2;
        }

        .c-lobby__gamemode {
            margin: 10px 3px;
            color: #a09b8c;
        }
    }

    .c-lobby__chat {
        .c-lobby__chat__messages {
            height: 150px;
            overflow-y: scroll;
            text-align: justify;
            padding: 5px;
        }

        .c-lobby__chat__input {
            font-size: 16px;
            background-color: #010a13;
            border: rgb(62, 53, 1) 2px solid;
            padding: 8px;
        }
    }
}
</style>
