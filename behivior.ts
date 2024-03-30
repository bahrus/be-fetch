import {register} from 'be-hive/register.js';
import {tagName } from './be-fetch.js';
import './be-fetch.js';

const ifWantsToBe = 'fetch';
const upgrade = '*';

register(ifWantsToBe, upgrade, tagName);