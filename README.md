# Bolao

## Rotas

- Usuario

  - GET users/
  - GET users/{id}
  - POST users/
  - POST users/signIn
  - PATCH users/{id}
  - DELETE users/{id}

- Campeonato

  - GET campeonatos/{id}
  - POST campeonatos/
    - Need token
  - DELETE campeonatos/{id}
    - Need token

- Aposta
  - GET apostas/
    - Need token
  - GET apostas/{id}
    - Need token
  - POST apostas/{id}
    - Need token
  - PATCH apostas/{id}
    - Need token

## Exemplos

- Usuario

  - Criando um usuario
    ```bash
    curl --request POST \
      --url http://localhost:3000/users \
      --header 'Content-Type: application/json' \
      --data '{
      "nome": "matheus",
      "email": "matheus.xmaz10@gmail.com",
      "senha": "123456",
      "cep": "11689346",
      "numero": "373"
    }'
    ```
  - Login e geração de token
    ```bash
          curl --request POST \
        --url http://localhost:3000/users/signIn \
        --header 'Content-Type: application/json' \
        --data '{
        "email": "matheus1.xmaz10@gmail.com",
        "senha": "123456"
      }'
    ```
  - Criando e Atualizando campeonato

    ```bash
      curl --request POST \
        --url http://localhost:3000/campeonatos \
        --header 'Authorization: Bearer {token}' \
        --header 'Content-Type: application/json' \
        --data '{
        "nome": "campeonato 2024",
        "nomePopular": "campeonato raro",
        "logo": "anyText",
        "slug": "anyText",
        "idCampeonatoApiExterna": "10"
      }'
    ```

  - Criando aposta
    ```bash
        curl --request POST \
        --url http://localhost:3000/apostas \
        --header 'Authorization: Bearer {token}.-rh7FQnznm6dG_BGK4og8gRtFD8XVAIt2c3RLAcdFXg' \
        --header 'Content-Type: application/json' \
        --data '{
        "placarMandate": 1,
        "placarVisitante": 21,
        "partida_id": 376
      }'
    ```
