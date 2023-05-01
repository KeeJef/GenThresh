<template>
    <button @click="connect()">Connect</button>
    <button @click="disconnect()">Disconnect</button>
  </template>
  
  <script>
  import { socket } from "@/socket";
  
  export default {
    name: "ConnectionManager",
    data: () => ({
      socketThing :""
    }),
  
    methods: {
      connect() {
        socket.connect();
        this.socketThing = socket;
        
      },
      disconnect() {
        socket.disconnect();
      }
    }
  }
  </script>