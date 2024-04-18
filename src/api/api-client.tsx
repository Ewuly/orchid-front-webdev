// Define a TypeScript interface for the User
interface User {
    id?: number; // Optional because it might not exist before a user is created
    username: string;
    email: string;
    password: string;
    // Add other user properties here
}

// Define a TypeScript type for the function that signs up a user
export function signUpUser(user: User): Promise<User> {
    // API call to sign up a user
    return fetch('https://orchid-backend-webdev.vercel.app/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data: User) => {
            console.log(data); // TO ERASE
            return data;
        })
        .catch(error => {
            console.error('Error during sign up:', error);
            throw error; // Re-throw to ensure errors can be handled where the function is called
        });
}

export function signInUser(username:string, password:string): Promise<string> {
    // API call to sign up a user
    return fetch('https://orchid-backend-webdev.vercel.app/auth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data: any) => {
            console.log(data); // TO ERASE
            localStorage.setItem('token', data.token);
            return data;
        })
        .catch(error => {
            console.error('Error during sign up:', error);
            throw error; // Re-throw to ensure errors can be handled where the function is called
        });
}

// Define a TypeScript type for the function that gets all users
export function getUsers(): Promise<User[]> {
    // API call to get all users
    return fetch('https://orchid-backend-webdev.vercel.app/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data: User[]) => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            throw error;
        });
}

// Define a TypeScript type for the function that gets a single user by ID
export function getUser(id: number): Promise<User> {
    // API call to get a single user by ID
    return fetch(`https://orchid-backend-webdev.vercel.app/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data: User) => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.error('Error fetching user:', error);
            throw error;
        });
}
