import Button from "@/elements/Button/Button"
import { speechToTextSupported, useSpeechToText } from "@nosto/search-js/preact/hooks"
import { useOnSubmit } from "../OnSubmitContext"
import { texts } from "@/config"

export default function SpeechToTextButton() {
  const onSubmit = useOnSubmit()
  const { startListening, listening, stopListening } = useSpeechToText({
    interimResults: true,
    onResult: onSubmit
  })

  if (!speechToTextSupported) {
    return null
  }

  return (
    <Button
      aria-label={listening ? texts.stopVoiceSearch : texts.startVoiceSearch}
      onClick={() => {
        if (listening) {
          stopListening()
        } else {
          startListening()
        }
      }}
    >
      🎤︎︎
    </Button>
  )
}
