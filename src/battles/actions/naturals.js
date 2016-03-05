import actionSchema from './battle-action-schema'

export default {
    /* MEMORY LEAK */
    action_naturaleffect_memoryLeak_001: {
        ...actionSchema,
        isNaturalStatusEvent: true,
        accuracyModifier: 999,
        affectCasterHpPointsByPercent: -0.07,
        submittedByStatus: "memoryLeak"
    },
    action_naturaleffect_lagExpire: {
        ...actionSchema,
        isNaturalStatusEvent: true,
        accuracyModifier: 999,
        clearCasterStatuses: ["lag"],
        submittedByStatus: "lag"
    }
}