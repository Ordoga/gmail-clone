function createEventEmitter() {
    const listenersMap = {}
    // Trick for DEBUG
    
    return {
        // Use this function to subscribe to an event
        on(evName, listener) {
            listenersMap[evName] = (listenersMap[evName]) ? [...listenersMap[evName], listener] : [listener]

            // Due to closure, it knows to remove the respective listener
            return () => {
                listenersMap[evName] = listenersMap[evName].filter(func => func !== listener)
            }
        },


        // Use this function to emit an event
        emit(evName, data) {
            if (!listenersMap[evName]) return
            listenersMap[evName].forEach(listener => listener(data))
        }
    }
}

export const eventBusService = createEventEmitter()