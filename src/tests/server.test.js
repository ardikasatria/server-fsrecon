import { app, mongoose, server, serverInit } from "../app.js";

describe("Server", () => {
  it("should start the server", async () => {
    const spy = jest.spyOn(serverInit, "startServer");
    await serverInit.startServer();
    expect(spy).toHaveBeenCalled();
  });

  it("should close the server", async () => {
    const spy = jest.spyOn(server, "close");
    await server.close();
    expect(spy).toHaveBeenCalled();
  });

  it("should return the app instance", () => {
    expect(app).toBeDefined();
  });
  it("should return the server instance", () => {
    expect(server).toBeDefined();
  });

  it("should return the mongoose instance", () => {
    expect(mongoose).toBeDefined();
  });
});
