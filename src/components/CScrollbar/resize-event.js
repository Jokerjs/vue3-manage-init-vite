const isServer = typeof window === 'undefined'

export const resizeHandler = (mutationsList, observer, element) => {
    const listeners = element.resizeListners || []
    if (listeners.length) {
        listeners.forEach((fn) => fn())
    }
}

export const addResizeListener = (element, fn) => {
    if (isServer) return
    if (!element.resizeListners) {
        element.resizeListners = []
        window.addEventListener('resize', fn)
        const mutationObserverSupported = typeof MutationObserver !== 'undefined'
        if (mutationObserverSupported) {
            element.observer = new MutationObserver((mutationsList, observer) => resizeHandler(mutationsList, observer, element))
            const config = {
                attributes: true,
                childList: true,
                subtree: true,
                characterData: true
            }
            element.observer.observe(element, config)
        }
    }
    element.resizeListners.push(fn)
}

export const removeResizeListener = (element, fn) => {
    if (!element || !element.resizeListners) return
    element.resizeListners.splice(element.resizeListners.indexOf(fn), 1)
    if (!element.resizeListners.length) {
        element.observer.disconnect()
    }
}
