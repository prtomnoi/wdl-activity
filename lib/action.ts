interface Register {
  message: string;
  data: {
    email: string;
    datetime: string;
    updated_at: string;
    created_at: string;
    id: number;
  };
}

export async function useRegister(
  email: string
): Promise<Register | null | { errors: number; message: string }> {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };

    const response = await fetch(
      "https://api.loveboxme.com/api/wdl-register",
      requestOptions
    );

    if (response.status === 422) {
      const errorResponse = await response.json();
      return errorResponse;
    }

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Fetch error", error);
    return null;
  }
}

export async function getCount(): Promise<{
  total_count: number;
  total_duplicate_emails: number;
} | null> {
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      "https://api.loveboxme.com/api/count-wdl-register",
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Fetch error", error);
    return null;
  }
}
