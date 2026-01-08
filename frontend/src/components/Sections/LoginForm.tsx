const LoginForm = () => {
  return (
    <form className="flex flex-col gap-2.5 bg-white p-[30px] w-[450px] rounded-[20px] font-sans shadow-sm">
      <div className="flex flex-col">
        <label className="text-[#151717] font-semibold">Name</label>
      </div>
      <div className="flex items-center h-[50px] border-[1.5px] border-[#ecedec] rounded-[10px] pl-2.5 transition-all duration-200 ease-in-out focus-within:border-[#2d79f3]">
        <input
          type="text"
          className="ml-2.5 rounded-[10px] border-none w-[85%] h-full outline-none placeholder:font-sans"
          placeholder="Enter your Name"
        />
      </div>

      <div className="flex flex-col mt-2">
        <label className="text-[#151717] font-semibold">Email</label>
      </div>
      <div className="flex items-center h-[50px] border-[1.5px] border-[#ecedec] rounded-[10px] pl-2.5 transition-all duration-200 ease-in-out focus-within:border-[#2d79f3]">
        <input
          type="email"
          className="ml-2.5 rounded-[10px] border-none w-[85%] h-full outline-none placeholder:font-sans"
          placeholder="Enter your Email"
        />
      </div>

      <div className="flex flex-col mt-2">
        <label className="text-[#151717] font-semibold">Password</label>
      </div>
      <div className="flex items-center h-[50px] border-[1.5px] border-[#ecedec] rounded-[10px] pl-2.5 transition-all duration-200 ease-in-out focus-within:border-[#2d79f3]">
        <input
          type="password"
          className="ml-2.5 rounded-[10px] border-none w-[85%] h-full outline-none placeholder:font-sans"
          placeholder="Enter your Password"
        />
      </div>

      <button
        type="submit"
        className="mt-5 mb-2.5 bg-[#151717] text-white text-[15px] font-medium rounded-[10px] h-[50px] w-full cursor-pointer hover:bg-[#252727] transition-colors"
      >
        Sign Up
      </button>

      <p className="text-center text-black text-sm my-1">
        Already have a account?{" "}
        <span className="ml-1 text-[#2d79f3] font-medium cursor-pointer">
          login
        </span>
      </p>

      <div className="flex flex-row items-center gap-2.5 justify-between">
        <button
          type="button"
          className="mt-2.5 w-full h-[50px] rounded-[10px] flex justify-center items-center font-medium gap-2.5 border border-[#ededef] bg-white cursor-pointer transition-all duration-200 ease-in-out hover:border-[#2d79f3]"
        >
          Google
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
