//@ts-nocheck
import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type Info = {
    $$type: 'Info';
    state: string;
    expiration: bigint;
    bank: bigint;
    challenger: Address | null;
}

export function storeInfo(src: Info) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4012972206, 32);
        b_0.storeStringRefTail(src.state);
        b_0.storeUint(src.expiration, 32);
        b_0.storeInt(src.bank, 257);
        b_0.storeAddress(src.challenger);
    };
}

export function loadInfo(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4012972206) { throw Error('Invalid prefix'); }
    let _state = sc_0.loadStringRefTail();
    let _expiration = sc_0.loadUintBig(32);
    let _bank = sc_0.loadIntBig(257);
    let _challenger = sc_0.loadMaybeAddress();
    return { $$type: 'Info' as const, state: _state, expiration: _expiration, bank: _bank, challenger: _challenger };
}

function loadTupleInfo(source: TupleReader) {
    let _state = source.readString();
    let _expiration = source.readBigNumber();
    let _bank = source.readBigNumber();
    let _challenger = source.readAddressOpt();
    return { $$type: 'Info' as const, state: _state, expiration: _expiration, bank: _bank, challenger: _challenger };
}

function storeTupleInfo(source: Info) {
    let builder = new TupleBuilder();
    builder.writeString(source.state);
    builder.writeNumber(source.expiration);
    builder.writeNumber(source.bank);
    builder.writeAddress(source.challenger);
    return builder.build();
}

function dictValueParserInfo(): DictionaryValue<Info> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeInfo(src)).endCell());
        },
        parse: (src) => {
            return loadInfo(src.loadRef().beginParse());
        }
    }
}

 type SimpleCounter_init_args = {
    $$type: 'SimpleCounter_init_args';
    id: bigint;
}

function initSimpleCounter_init_args(src: SimpleCounter_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.id, 257);
    };
}

async function SimpleCounter_init(id: bigint) {
    const __code = Cell.fromBase64('te6ccgECHgEABSQAART/APSkE/S88sgLAQIBYgIDA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVE9s88uCCFwQFAgEgDxACoO2i7fsBkjB/4HAh10nCH5UwINcLH94gghCUapi2uo6oMNMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8f+DAAJEw4w1wBgcAwMj4QwHMfwHKAFUwUEMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPABLLHwEgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4sntVAE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwNBNj5ASCC8PdwBzPHnf0inflfHlXi0SUsOC8NPCjcsgVjhF6MLZhGuo/CMNs8gTvOi4UFJFUEFSRUSFUx2zxsMRIB+QEB+QG6EvL0gWzM+EFvJBNfA4IJycOAvvL0ggkxLQD4I6Z4Its8f9sx4CAIFgoJABL4QlJAxwXy4IQD0oLwqji74Zx6E0aq7SaCNzznMcMR/ZNgIiQgw9rsppDkweO6j0MwggDpKYt09OR09JTkeFUx2zxsIRMB+QEB+QG6E/L0ggC5wfhBbyQTXwOCCJiWgL7y9IIImJaAoPgjpnj4Qts8f9sx4BYKCwEu+EJ/+CdvEIIImJaAoSWhchAjbW1t2zwNAUqC8AlRkBlK7mEc6JXFUDrfhf2GTeeQV0YUL2CNPrL6rRTkuuMCDAPIggDuT4tUVOREVEhVMds8MlBEAfkBAfkBuhTy9IIA8BL4QhMhbpJbcJLHBeIS8vT4I6Z4UxKnMoBkqQQkpwqAZKkEXKAWoX9URRdyECNtbW3bPPhCf1iAQhAjbW1t2zwQI3/bMRYNDQHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wAOAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAgEgERICASAaGwIBIBMUAhG4Ud2zzbPGxBgXGAIRtsFbZ5tnjYiQFxUCEbXiu2ebZ42IMBcWARRUcyEjVTPbPDQSFgBeIcAAmouFBSRVBBUkVEjg+CMiuZF/lvgjIqZ4vOKZi3T05HT0lOR44ItUVOREVEgB8u1E0NQB+GPSAAGOV/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wDTH/pAIdcLAcMAjh0BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiJIxbeIUQzBsFOD4KNcLCoMJuvLgiYEBAdcAAQHR2zwZAAIjABAwcG34QlQiEwC5u70YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwnZdOWrNOy3M6DpZtlGbopIJwQM51aecV+dJQsB1hbiZHsoAgFIHB0AEbCvu1E0NIAAYAB1sm7jQ1aXBmczovL1FtZDY1OHNOVHlXaGsxNGh4d1hpTm00RGh6Z1RvUDh4V3o0S1pxb2RxbUp4eG2CA=');
    const __system = Cell.fromBase64('te6cckECIAEABS4AAQHAAQEFoJ0fAgEU/wD0pBP0vPLICwMCAWIRBAIBIAoFAgEgCQYCAUgIBwB1sm7jQ1aXBmczovL1FtZDY1OHNOVHlXaGsxNGh4d1hpTm00RGh6Z1RvUDh4V3o0S1pxb2RxbUp4eG2CAAEbCvu1E0NIAAYAC5u70YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwnZdOWrNOy3M6DpZtlGbopIJwQM51aecV+dJQsB1hbiZHsoAgEgDQsCEbhR3bPNs8bEGB4MAAIjAgEgDw4CEbXiu2ebZ42IMB4ZAhG2wVtnm2eNiJAeEAEUVHMhI1Uz2zw0EhkDetAB0NMDAXGwowH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIVFBTA28E+GEC+GLbPFUT2zzy4IIeExIAwMj4QwHMfwHKAFUwUEMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPABLLHwEgbpUwcAHLAY4eINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8W4sntVAKg7aLt+wGSMH/gcCHXScIflTAg1wsf3iCCEJRqmLa6jqgw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4MAAkTDjDXAbFATY+QEggvD3cAczx539Ip35Xx5V4tElLDgvDTwo3LIFY4RejC2YRrqPwjDbPIE7zouFBSRVBBUkVEhVMds8bDESAfkBAfkBuhLy9IFszPhBbyQTXwOCCcnDgL7y9IIJMS0A+COmeCLbPH/bMeAgGhkYFQPSgvCqOLvhnHoTRqrtJoI3POcxwxH9k2AiJCDD2uymkOTB47qPQzCCAOkpi3T05HT0lOR4VTHbPGwhEwH5AQH5AboT8vSCALnB+EFvJBNfA4IImJaAvvL0ggiYloCg+COmePhC2zx/2zHgGRgWAUqC8AlRkBlK7mEc6JXFUDrfhf2GTeeQV0YUL2CNPrL6rRTkuuMCFwPIggDuT4tUVOREVEhVMds8MlBEAfkBAfkBuhTy9IIA8BL4QhMhbpJbcJLHBeIS8vT4I6Z4UxKnMoBkqQQkpwqAZKkEXKAWoX9URRdyECNtbW3bPPhCf1iAQhAjbW1t2zwQI3/bMRkcHAEu+EJ/+CdvEIIImJaAoSWhchAjbW1t2zwcAF4hwACai4UFJFUEFSRUSOD4IyK5kX+W+CMipni84pmLdPTkdPSU5Hjgi1RU5ERUSAAS+EJSQMcF8uCEATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPBwByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAHQCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAHy7UTQ1AH4Y9IAAY5X+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXANMf+kAh1wsBwwCOHQEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIkjFt4hRDMGwU4Pgo1wsKgwm68uCJgQEB1wABAdHbPB8AEDBwbfhCVCITbXABkg==');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initSimpleCounter_init_args({ $$type: 'SimpleCounter_init_args', id })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const SimpleCounter_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    15310: { message: `The game has already been started` },
    27852: { message: `Deposit is less than the minimum initial bank` },
    47553: { message: `Insufficient bid` },
    59689: { message: `The game is not ongoing` },
    61007: { message: `Cannot withdraw from an ongoing game` },
    61458: { message: `Only winner can withdraw` },
}

const SimpleCounter_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Info","header":4012972206,"fields":[{"name":"state","type":{"kind":"simple","type":"string","optional":false}},{"name":"expiration","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"bank","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"challenger","type":{"kind":"simple","type":"address","optional":true}}]},
]

const SimpleCounter_getters: ABIGetter[] = [
    {"name":"state","arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"info","arguments":[],"returnType":{"kind":"simple","type":"Info","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const SimpleCounter_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"text","text":"start"}},
    {"receiver":"internal","message":{"kind":"text","text":"bid"}},
    {"receiver":"internal","message":{"kind":"text","text":"withdraw"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class SimpleCounter implements Contract {
    
    static async init(id: bigint) {
        return await SimpleCounter_init(id);
    }
    
    static async fromInit(id: bigint) {
        const init = await SimpleCounter_init(id);
        const address = contractAddress(0, init);
        return new SimpleCounter(address, init);
    }
    
    static fromAddress(address: Address) {
        return new SimpleCounter(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  SimpleCounter_types,
        getters: SimpleCounter_getters,
        receivers: SimpleCounter_receivers,
        errors: SimpleCounter_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: 'start' | 'bid' | 'withdraw' | Deploy) {
        
        let body: Cell | null = null;
        if (message === 'start') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'bid') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'withdraw') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getState(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('state', builder.build())).stack;
        let result = source.readString();
        return result;
    }
    
    async getInfo(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('info', builder.build())).stack;
        const result = loadTupleInfo(source);
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}
