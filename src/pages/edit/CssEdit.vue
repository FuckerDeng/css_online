<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'

let htmlFrame = ref<HTMLIFrameElement>()
let updateHtml = (html: string) => {
    let htmlBlob = new Blob([html], {
        type: 'text/html'
    });
    let url = URL.createObjectURL(htmlBlob)
    htmlFrame.value!.src = url
    htmlFrame.value!.onload = () => {
        appendCss()
        appendJs()
    }
}
let appendCss = () => {
    //增加css
    let head = htmlFrame.value!.contentDocument!.querySelector("head") as HTMLHeadElement
    let link = document.createElement("style") as HTMLLinkElement
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.innerHTML = cssCode.value
    head.appendChild(link);
}
let appendJs = () => {
    //增加js
    let body = htmlFrame.value!.contentDocument!.querySelector("body") as HTMLBodyElement
    let script = document.createElement("script") as HTMLScriptElement
    script.setAttribute("type", "module");
    script.innerHTML = jsCode.value
    body.appendChild(script);
}

//3个编辑器相关
const htmlCode = ref(`<h1>html代码放这里</h1>`)
const cssCode = ref(`h1{
  background-color:pink;
}
`)
const jsCode = ref(`console.log("javascript代码放这里")`)

const htmlExtensions = [html({
    autoCloseTags: true
})]
const cssExtensions = [css()]
const jsExtensions = [javascript()]

//更新iframe页面代码
onMounted(() => {
    updateCode()
})
let updateCode = () => {
    updateHtml(htmlCode.value)

}



</script>

<template>
    <div class="container  ">
        <iframe ref="htmlFrame" frameborder="0" class="col"></iframe>
        <div class="col">
            <codemirror v-model="htmlCode" placeholder="html Code goes here..." :style="{ height: '100%' }"
                :indent-with-tab="true" :tab-size="2" :extensions="htmlExtensions" @change="updateCode" />
        </div>
        <div class="col">
            <codemirror v-model="cssCode" placeholder="css Code goes here..." :style="{ height: '100%' }"
                :indent-with-tab="true" :tab-size="2" :extensions="cssExtensions" @change="updateCode" />
        </div>
        <div class="col">
            <codemirror v-model="jsCode" placeholder="javascript Code goes here..." :style="{ height: '100%' }"
                :indent-with-tab="true" :tab-size="2" :extensions="jsExtensions" @change="updateCode" />
        </div>
    </div>

</template>
<style scoped >
.container {
    display: flex;
    height: 100%;
}

.col {
    flex: 1;
    border-right: 1px solid gray;
}
</style>