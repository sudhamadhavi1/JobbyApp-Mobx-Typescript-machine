// import { assign, createMachine } from 'xstate';

// const loginFormMachine = createMachine(
//   {
//     tsTypes: {} as
//     /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgBssoBLDAMSwCcBbfEABy1hIBcSsN6APRAJgCMAZgB0Q8UICsAdgCcQgBwA2ACySVS9AE9EAWgGSRApSekCVCoSqFLZy5GhBFSFajREkIBMPSYt2nDz8SgJiEjLyymoa2ohmIrKJidLSAAyKkpkqDg5AA */
//     id: 'loginForm',
//     initial: 'idle',
//     context: {
//       userName: '',
//     },
//     states: {
//       idle: {
//         on: {
//           TYPING: {
//             actions: 'typing',
//           },
//         },
//       },
//     },
//   },
//   {
//     actions: {
//       typing: assign({
//         userName: (ctx, e: {type: 'TYPING'; value: string}) => ({
//           userName: e.value,
//         }),
//       }),
//     },
//   },
// );

// export default loginFormMachine;
