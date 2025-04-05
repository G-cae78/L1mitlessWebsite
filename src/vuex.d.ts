import { Store } from 'vuex';
import { State } from './store/index'; // Import the state type from your Vuex store

declare module '@vue/runtime-core' {
  // Declare your own store states
  interface ComponentCustomProperties {
    $store: Store<State>; // Use the actual state type here
  }
}