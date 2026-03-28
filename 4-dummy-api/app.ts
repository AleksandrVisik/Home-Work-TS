// Enum для статусов запроса
enum RequestStatus {
  Success = "success",
  Error = "error",
  Pending = "pending"
}

// Интерфейс для данных пользователя 
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

// Интерфейс для структуры ответа API
interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

// Интерфейс для результата выполнения функции
interface FetchUsersResult {
  status: RequestStatus;
  data?: UsersResponse;
  error?: string;
}

// Функция для получения и вывода данных пользователей
async function fetchUsers(): Promise<FetchUsersResult> {
  console.log("Запрос");

  try {
    // Устанавливаем статус "в процессе"
    let status = RequestStatus.Pending;
    console.log(`Статус запроса: ${status}`);

    // Запрос к API
    const response = await fetch('https://dummyjson.com/users');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Парсим JSON-ответ
    const data: UsersResponse = await response.json();

    // Обновляем статус на "успех"
    status = RequestStatus.Success;
    console.log(`Статус запроса: ${status}`);

    // Выводим часть данных пользователей в консоль
    console.log("Полученные данные пользователей:");
    data.users.forEach(user => {
      console.log({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        age: user.age
      });
    });

    return { status, data };
  } catch (error) {
    // Обрабатываем ошибки (сетевые проблемы, ошибки API и т. д.)
    const status = RequestStatus.Error;
    console.error(`Статус запроса: ${status}`);

    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Произошла ошибка при получении данных:", errorMessage);

    return { status, error: errorMessage };
  }
}

// Вызываем функцию и обрабатываем результат
fetchUsers()
  .then(result => {
    if (result.status === RequestStatus.Success) {
      console.log("Операция завершена успешно!");
    } else {
      console.log("Операция завершилась с ошибкой.");
    }
  })
  .catch(console.error);