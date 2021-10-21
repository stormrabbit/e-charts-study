<template>
    <div id="monaco-editor-box">
        <div id="monaco-editor" ref="monacoEditor" />
        <div>
            <span @click="showInfo">测试</span>
        </div>
        <div>{{content}}</div>
    </div>
</template>

<script>
import * as monaco from "monaco-editor/esm/vs/editor/editor.main";
import {toRaw} from 'vue'
export default {
    components: {},
    props: {
        editorOptions: {
            type: Object,
            default: function () {
                return {
                    selectOnLineNumbers: true,
                    roundedSelection: false,
                    readOnly: true, // 只读
                    cursorStyle: "line", //光标样式
                    automaticLayout: false, //自动布局
                    glyphMargin: true, //字形边缘
                    useTabStops: false,
                    fontSize: 28, //字体大小
                    autoIndent: true, //自动布局
                    //quickSuggestionsDelay: 500,   //代码提示延时
                };
            },
        },
        codes: {
            type: String,
            default: function () {
                return "// 请输入 JavaScript 代码";
            },
        },
    },
    data() {
        return {
            editor: null, //文本编辑器
            isSave: true, //文件改动状态，是否保存
            codeValue: null, //保存后的文本
            content: ''
        };
    },
    mounted() {
        this.initEditor();
    },
    watch:{
    },
    methods: {
        showInfo() {
            console.log('==>showInfo')
            const info = toRaw(this.editor).getValue()
            // console.log(info)
            window.info = info
            
            this.content = eval(`(() => {\n${info}\n})()`)
        },
        initEditor() {
            const self = this;
            // 初始化编辑器，确保dom已经渲染
            this.editor = monaco.editor.create(self.$refs.monacoEditor, {
                value: self.codeValue || self.codes, // 编辑器初始显示内容
                language: "javascript", // 支持语言
                theme: "vs-dark", // 主题
                selectOnLineNumbers: true, //显示行号
                editorOptions: self.editorOptions,
            });
            self.$emit("onMounted", self.editor); //编辑器创建完成回调
            self.editor.onDidChangeModelContent(function () {
                console.log(self.editor)
                window.editor = self.editor
                //编辑器内容changge事件
                // self.codesCopy = self.editor.getValue();
                // const content = self.editor.getValue();
                // console.log(content)
                // self.$emit("onCodeChange", self.editor.getValue(), event);
            });
        },
    },
};
</script>

<style scoped>
#monaco-editor {
    height: 600px;
}
</style>

