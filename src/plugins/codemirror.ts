import { basicSetup } from 'codemirror'
import VueCodemirror from 'vue-codemirror'

export default function useCodeMirror(app:any){
    app.use(VueCodemirror, {
        // optional default global options
        autofocus: true,
        disabled: false,
        indentWithTab: true,
        tabSize: 2,
        placeholder: 'Code goes here...',
        extensions: [basicSetup]
        // ...
      })
}