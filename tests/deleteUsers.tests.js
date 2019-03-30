describe("/user/delete:name ", () => {
    test("It expects status code 200", async () => {
      const response = await request(app).get("/user/delete:name");
      expect(response.statusCode).toBe(200);
    });
  });