export const loginFunction = (id, password, userType) => {
  const validUsers = {
    guard: {
      id: "G123",
      password: "guard123",
      name: "محمد احمد",
      role: "guard",
    },
    officer: {
      id: "O456",
      password: "officer123",
      name: "العقيد سعيد محمد",
      role: "officer",
    },
  };

  const validUser = validUsers[userType];

  if (validUser && validUser.id === id && validUser.password === password) {
    return {
      success: true,
      user: {
        id: validUser.id,
        name: validUser.name,
        role: validUser.role,
      },
    };
  } else {
    return { success: false, message: "رقم المستخدم أو كلمة المرور غير صحيحة" };
  }
};
