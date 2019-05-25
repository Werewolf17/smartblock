/// <reference types="react" />
import { Extension } from '../types';
export default class Heading2 implements Extension {
    readonly name: string;
    readonly showMenu: boolean;
    readonly schema: {
        content: string;
        group: string;
        defining: boolean;
        parseDOM: {
            tag: string;
        }[];
        attrs: {
            align: {
                default: string;
            };
        };
        toDOM(node: any): (string | number | {
            style: string;
        })[];
    };
    readonly icon: JSX.Element;
    active(state: any): boolean;
    enable(state: any): boolean;
    customMenu({ state, dispatch }: {
        state: any;
        dispatch: any;
    }): JSX.Element;
    onClick(state: any, dispatch: any): void;
}