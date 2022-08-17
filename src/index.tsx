import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { createServer, Model } from "miragejs";

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Freelance de websites",
          type: "deposit",
          amount: 6000,
          category: "Dev",
          createdAt: new Date("2020-01-01 09:00:00"),
        },
        {
          id: 2,
          title: "Aluguel",
          type: "withdraw",
          amount: 1100,
          category: "Casa",
          createdAt: new Date("2020-01-10 11:00:00"),
        },
      ],
    });
  },
  routes() {
    this.namespace = "/api";

    this.get("/transactions", () => {
      return this.schema.all("transaction");
    });

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create("transaction", data);
    });
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
