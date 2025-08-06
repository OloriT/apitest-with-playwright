import { test, expect } from '@playwright/test';

test('Register provider with no first name', async ({ request }) => {

    const response = await request.post('https://clarawave-backend.onrender.com/', {
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `mutation RegisterCareProvider {
                registerCareProvider(input: {firstName: ""
      lastName: "Olori"
      email: "taiwo@mailinator.com"
      phone: "08012345678"
      password: "Password123"
      businessName: "Taiwo Ventures"
      address: "Eko Atlantic"
      city: "Lagos"
      country: "Nigeria"
      otp: "849503"
      medicaidProviderId: "MED123"
      nationalProviderId: "NAT123"
      employerIdNo: "EMP123"
      state: "Lagos"
      zipCode: "2349019"
    },
    licenseFile: "driver-file.pdf"
  ) {
    status
    message
    token
    data {
      id
      firstName
      lastName
      email
      phone
      createdAt
      updatedAt
    }
  }
}
            }`
        })


    })
    expect(response.status()).toBe(400);
    await expect(response).not.toBeOK();


});


test('Register provider with invalid data', async ({ request }) => {

    const response = await request.post('https://clarawave-backend.onrender.com/', {
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `mutation RegisterCareProvider {
                registerCareProvider(input: {}, licenseFile: "") {
                    status
                    message
                    token
                    data {
                        id
                        firstName
                        lastName
                        email
                        phone
                        createdAt
                        updatedAt
                    }
                }
            }`
        })


    })
    expect(response.status()).toBe(400);
    await expect(response).not.toBeOK();

});


test('API DELETE Request', async ({ request }) => {

    const reponse = await request.delete('https://reqres.in/api/users/2', {
        data: {
            "name": "Timo",
            "job": "QA Manager"
        },
        headers: {
            'x-api-key': 'reqres-free-v1',
            'Content-Type': 'application/json'
        },
    })

    expect(reponse.status()).toBe(204)

})


test('API PUT Request', async ({ request }) => {

    const reponse = await request.put('https://reqres.in/api/users/2', {
        data: {
            "name": "Timo",
            "job": "QA Manager"
        },
        headers: {
            'x-api-key': 'reqres-free-v1',
            'Content-Type': 'application/json'
        },
    })


    expect(reponse.status()).toBe(200);

    const body = await reponse.json();
    expect(body.name).toContain('Timo')
    expect(body.job).toContain('QA Manager')

    console.log(await reponse.json());
})



test('API POST Request', async ({ request }) => {

    const reponse = await request.post('https://reqres.in/api/users', {
        data: {
            "name": "Timo",
            "job": "QA Lead."
        },
        headers: {
            'x-api-key': 'reqres-free-v1',
            'Content-Type': 'application/json'
        },
    })


    expect(reponse.status()).toBe(201);

    const body = await reponse.json();
    expect(body.name).toContain('Timo')
    expect(body.job).toContain('QA Lead.')

    console.log(await reponse.json());
})


test('API GET Request', async ({ request }) => {

    const reponse = await request.get('https://reqres.in/api/users?page=2')

    expect(reponse.status()).toBe(200);

    const text = await reponse.text();
    expect(text).toContain('Michael')

    console.log(await reponse.json());
})