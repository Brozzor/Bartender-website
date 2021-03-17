<template>
    <div class="appBottomMenu" style="background: #0F1C2F;border-top-color: #1B283B;">
        <a href="index.html" class="item">
            <div class="col">
                <img class="md hydrated iconbottom" height="26" src="/img/icons/control.svg" alt="">
            </div>
        </a>
        <a href="app-components.html" class="item">
            <div class="col">
                <img class="md hydrated iconbottom" height="26" src="/img/icons/cocktail.svg" alt="">
            </div>
        </a>
        <a href="page-chat.html" class="item">
            <div class="col">
                <img class="md hydrated iconbottom" height="26" src="/img/icons/bottle.svg" alt="">
            </div>
        </a>

        <a href="javascript:;" class="item" data-toggle="modal" data-target="#sidebarPanel">
            <div class="col">
                 <img class="md hydrated iconbottom" height="26" src="/img/icons/log.svg" alt="">
            </div>
        </a>
    </div>
</template>

<script>
export default {
    name: "BottomMenu"
}
</script>