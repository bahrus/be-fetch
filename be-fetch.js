import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
export class BeFetch extends BE {
    static get beConfig() {
        return {
            parse: true,
            //parseAndCamelize: true,
            isParsedProp: 'isParsed'
        };
    }
    async register(self) {
        //TODO:  this seems like a nice shareable function that could be used in other scenarios.
        //move to trans-render?
        const { enhancedElement } = self;
        const { localName } = enhancedElement;
        const inherits = enhancedElement.getAttribute('inherits') || window['be-fetch']?.dataset?.inherits;
        if (inherits) {
            const inheritFrom = await customElements.whenDefined(inherits);
            customElements.define(localName, class extends inheritFrom {
            });
        }
        else {
            if (customElements.get(localName) === undefined) {
                await import('fetch-for/fetch-for.js');
                const fetchFor = await customElements.whenDefined('fetch-for');
                customElements.define(localName, class extends fetchFor {
                });
            }
        }
        return {
            resolved: true,
        };
    }
}
export const tagName = 'be-fetch';
const xe = new XE({
    config: {
        tagName,
        isEnh: true,
        propDefaults: {
            ...propDefaults,
        },
        propInfo: {
            ...propInfo,
        },
        actions: {
            register: 'isParsed',
        }
    },
    superclass: BeFetch,
});
