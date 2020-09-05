// toasted
const toasted = {
    duration: 5000, // tip: uncomment to disable infinite time
    position: 'bottom-right',
    iconPack: 'mdi',
    type: 'show',
    icon: 'alert-circle',
    singleton: true,
    // you can pass a single action as below
    action: {
        text: 'Fermer',
        onClick: (e, toastObject) => {
            toastObject.goAway(0)
        }
    }
}

export default toasted
