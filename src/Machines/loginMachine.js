import Cookies from 'js-cookie';
import {Machine, assign} from 'xstate';

const onFormSubmitAPI = async userDetails => {
  const url = 'https://apis.ccbp.in/login';
  const options = {
    method: 'POST',
    body: JSON.stringify(userDetails),
  };
  const response = await fetch(url, options);
  const data = await response.json();
  if (response.ok === true) {
    return data;
  }
  return Promise.reject(data);
};

const loginMachine = Machine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBsD2UCWA7AtgQwGMALbMAOi1QBcAZdGCASSwGUq8qwBiVLAMVQAnHCwCuAIxwYqAUQBuYLFQDaABgC6iUAAdUsaRl5aQAD0QBmVarIAOVQHYAjACYArK+d2bAFgA0IAE8Lc2cyAE5nMLDze1cANmdHVW9HAF9U-zRMXEISLHJeAWExSWkuCF5ybDlUAGtyLOw1TSQQXX0qQyxjMwR7c0cyextHAdUQsO8I-yCERzibMm9XG3Nvb1VHEZcbG3TM9Gx8YlIyQqERCSkqLjBBQSEybWQOADMLskasZuN2gyNWr13PYyM5zHEwq5VK4whCRjYZogALSOVxkFxTbxxBaqCEubH7EBfY55cjvYpXaR8PAYZCiQTcc4U0qyBRKH6tP6dAGgXpgtHOSJbcxhGzYxxbZyIhDOKygqGbdYKrGw9IZECUCBwYzE3KkX56f7dQHIuLSlGqUJCuKoqwxOL9VyE3UnfIUah0KAMZhsDhgA0dLo9RDLMiuFIO2VJbzbMLS5z9WwuVxbGxhaEhOLOw45V0FfgXErXANG4MILGLRI2ewRG2xdb2aWOGvheYOhb2B32DbmbPZEmncmXFliAgEODwTmG7nG3mIaKhOLmcOTavQ2GueOWshWKyObzLsL7uLuPtHPVuodFqk0ukMkszsveKWBRAuQbh+axTarZfLtWpEAA */
    id: 'loginmachine',
    initial: 'notLoggedInState',
    context: {
      username: '',
      password: '',
    },
    states: {
      notLoggedInState: {
        on: {
          onFormSubmitEvent: {
            actions: ['saveFormValuesToContext'],
            target: 'onFormSubmit',
          },
        },
      },
      onFormSubmit: {
        tags: ['submitButtonLoading'],
        invoke: {
          id: 'login',
          src: 'onFormSubmit',
          onDone: [
            {
              target: 'formSubmitSuccess',
              actions: ['setCookies', 'saveTokenToContext'],
            },
          ],
          onError: {
            target: 'formSubmitFailure',
            actions: [
              'setErrorMessage',
              (context, event) => {
                console.log(event);
              },
            ],
          },
        },
      },
      formSubmitSuccess: {
        type: 'final',
      },
      formSubmitFailure: {
        on: {
          onFormSubmitEvent: {
            target: 'onFormSubmit',
          },
        },
      },
    },
  },
  {
    actions: {
      saveFormValuesToContext: assign((context, event) => ({
        username: event.username,
        password: event.password,
      })),
      setCookies: (context, event) => {
        Cookies.set('jwt_token', event.data.jwt_token, {
          expires: 30,
          path: '/',
        });
      },
      saveTokenToContext: assign((context, event) => ({
        jwtToken: event.data.jwt_token,
      })),
      setErrorMessage: assign((context, event) => ({
        error: event.data.error_msg,
      })),
    },
    services: {
      onFormSubmit: (context, _) => {
        const requestObject = {
          username: context.username,
          password: context.password,
        };
        return onFormSubmitAPI(requestObject);
      },
    },
  },
);

export default loginMachine;
