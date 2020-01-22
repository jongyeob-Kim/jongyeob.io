---
title: "[자바의 정석] Chapter 08. 예외 처리"
date: "2020-01-22T11:13"
template: "post"
draft: false
slug: "/posts/java/book/standard-of-java/ch08-exception-handling/"
category: "Java"
tags:
  - "Java"
  - "자바의 정석"
  - "예외 처리"
description: "프로그램이 실행 중 어떤 오류에 의해 오작동을 하거나 비정상적으로 종료되는 경우, 이러한 결과를 초래하는 원인을 프로그램 에러 또는 오류라고 한다."
---

## 1. 예외처리 (exception handling)

### 1.1 프로그램 오류

프로그램이 실행 중 어떤 오류에 의해 오작동을 하거나 비정상적으로 종료되는 경우, 이러한 결과를 초래하는 원인을 프로그램 에러 또는 오류라고 한다.

#### 컴파일

- 컴파일 시에 발생하는 에러

#### 런타임 에러

- 프로그램 실행 도중에 발생하는 에러

#### 논리적 에러

- 실행은 되지만 의도와 다르게 동작하는 것

소스코드를 컴파일하면 컴파일러가 소스코드(*.java)에 대해 오타나 잘못된 구문, 자료형 체크 등의 기본적인 검사를 수행하여 오류가 있는지를 알려준다.
<br />
런타임 에러를 방지하기 위해서는 프로그램의 실행 도중 발생할 수 있는 모든 경우의 수를 고려하여 이에 대한 대비를 하는 것이 필요하다.

#### 에러 (error)

- OutOfMemoryError나 StackOverFlowError와 같이 일단 발생하면 복구할 수 없는 심각한 오류. 프로그램 코드에 의해서 수습될 수 없는 심각한 오류

#### 예외 (exception)

- 프로그램 코드에 의해서 수습될 수 있는 다소 미약한 오류

### 1.2 예외 클래스의 계층 구조

자바에서는 실행 시 발생할 수 있는 오류(Exception과 Error)를 클래스로 정의하였다.

```
Exception 클래스와 RuntimeException 클래스 중심의 상속 계층도

Exception
    ├── IOException
    ├── ClassNotFoundException
    ├── ...
    └── RuntimeException
        ├── ArithmetixException
        ├── ClassCastException
        ├── NullPointerException
        ├── ...
        └── IndexOutOfBoundsException

1. Exception 클래스와 그 자손들 (RuntimeException과 그 자손들 제외)
2. RuntimeException 클래스와 그 자손들
```

RuntimException 클래스들은 주로 `프로그래머의 실수`에 의해서 발생할 수 있는 예외로 자바의 프로그래밍 요소와 관계가 깊다.
<br />
Exception 클래스들은 주로 `외부의 영향`으로 발생할 수 있는 것들로 프로그램의 사용자들의 동작에 의해서 발생하는 경우가 많다. FileNotFoundException, ClassNotFoundException, DataFormatException 등..

### 1.3 예외 처리하기 — try-catch문

프로그램의 실행 도중에 발생하는 에러는 어쩔 수 없지만, 예외는 프로그래머가 이에 대한 처리를 미리 해주어야 한다.
<br />
`예외처리` 란 프로그램 실행 시 발생할 수 있는 `예기치 못한 예외의 발생에 대비한 코드를 작성`하는 것이다.

```java
예외처리(exception handling)의
  정의 : 프로그램 실행 시 발생할 수 있는 예외의 발생에 대비한 코드를 작성하는 것
  목적 : 프로그램의 비정상 종료를 막고, 정상적인 실행 상태를 유지하는 것

예외를 처리하기 위한 try-catch문 

try {
  // 예외가 발생할 가능성이 있는 문장
} catch (Exception1 e1) {
  // Exception1이 발생했을 경우, 처리하기 위한 문장
} catch (Exception2 e2) {
  // Exception2가 발생했을 경우, 처리하기 위한 문장
}
```

### 1.4 try-catch문에서의 흐름

```java
- try 블럭 내에서 예외가 발생한 경우
1. 발생한 예외와 일치하는 catch 블럭이 있는지 확인한다.
2. 일치하는 catch 블럭을 찾게 되면, 그 catch 블럭 내의 문장들을 수행하고 전체 try-catch문을 빠져나가서 
   그 다음 문장을 계속해서 수행한다. 만일 일치하는 catch 블럭을 찾지 못하면, 예외는 처리되지 않는다.

- try 블럭 내에서 예외가 발생하지 않는 경우
1. catch 블럭을 거치지 않고 전체 try-catch문을 빠져나가서 수행을 계속한다.
```

### 1.5 예외의 발생과 catch 블럭

catch 블럭은 괄호()와 블럭{} 두 부분으로 나눠져 있는데, 괄호()내에서 처리하고자 하는 예외와 같은 타입의 참조변수 하나를 선언해야 한다.
<br />
예외가 발생하면, 발생한 예외에 해당하는 클래스의 인스턴스가 만들어진다. 첫 번째 catch 블럭부터 차례로 내려가면서 catch 블럭의 `괄호()내에 선언된 참조변수의 종류와 생성된 예외 클래스의 인스턴스에 instanceof 연산자를 이용해서 검사`하게 된다.

#### printStackTrace()와 getMessage()

getMessage()와 printStackTrace()를 통해서 발생한 예외에 대한 정보를 얻을 수 있다.
<br />
catch 블럭의 괄호()에 선언된 참조변수를 통해 이 인스턴스에 접근할 수 있다.

```java
printStackTrace() 
 - 예외 발생 당시의 호출스택(Call Stack)에 있었던 메서드의 정보와 예외 메시지를 화면에 출력한다.

getMessage()
 - 발생한 예외 클래스의 인스턴스에 저장된 메시지를 얻을 수 있다.
```

### 1.6 예외 발생시키기

키워드 `throw`를 사용해서 프로그래머가 고의로 예외를 발생시킬 수 있다.

```java
1. 먼저 연산자 new를 이용해서 발생시키려는 예외 클래스의 객체를 만든 다음
	Exception e = new Exception("고의로 발생시켰음");
2. 키워드 throw를 이용해서 예외를 발생시킨다.
	throw e;
```

Checked Exception과 Unchecked Exception

```java
// 컴파일 에러 발생. 예외처리가 되어야 할 부분에 예외 처리가 되어 있지 않다는 에러.
public static void main(String[] args) {
	throw new Exception();
}

// 컴파일 성공. 
// RuntimeException 클래스와 그 자손에 해당하는 예외는 프로그래머의 실수로 발생하는 것이기 때문에 
// 예외 처리를 강제하지 않는다.
public static void main(String[] args) {
	throw new RuntimeException();
}
```

컴파일러가 예외 처리를 확인하는 Exception 클래스들을 `Checked 예외` 라고 한다.
<br />
컴파일러가 예외 처리를 확인하지 않는 RuntimeException 클래스들을 `Unchecked 예외` 라고 한다.

### 1.7 메서드에 예외 선언하기

예외를 처리하는 방법에는 try-catch 문을 사용하는 것 외에, `예외를 메서드에 선언`하는 방법이 있다.
<br />
메서드의 선언부에 키워드 throws를 사용해서 메서드 내에서 발생할 수 있는 예외를 적어주기만 하면 된다.

```java
void method() throws Exception1, Exception2, ... ExceptionN {
	// 메서드의 내용
}
예외를 발생시키는 키워드 throw와 예외를 메서드에 선언할 때 쓰이는 throws를 잘 구분
// 모든 예외의 최고 조상인 Exception 클래스 선언
// 모든 종류의 예외가 발생할 가능성이 있다는 뜻이다.
void method() throws Exception {
	// 메서드의 내용
}
메서드의 선언부에 예외를 선언함으로써 메서드를 사용하려는 사람이 메서드의 선언부를 보았을 때, 이 메서드를 사용하기 위해서는 어떠한 예외들이 처리되어야 하는지 쉽게 알 수 있다.
메서드를 작성할 때 메서드 내에서 발생할 가능성이 있는 예외를 메서드의 선언부에 명시하여, 이 메서드를 사용하는 쪽에서 이에 대한 처리를 하도록 강요
```

메서드에 예외를 선언할 때 일반적으로 RuntimeException 클래스들을 적지 않는다.

```java
java.lang.Object 클래스의 wait() 메서드

public final void wait() throws InterruptedException
예외를 메서드의 throws에 명시하는 것은 예외를 처리하는 것이 아니라, 자신(예외가 발생할 가능성이 있는 메서드)을 호출한 메서드에게 예외를 전달하여 예외 처리를 떠맡기는 것이다.
// 예외 발생 실행 결과
java.lang.Exception
		at ExceptionEx12.method2(ExceptionEx12.java:11)
		at ExceptionEx12.method1(ExceptionEx12.java:7)
		at ExceptionEx12.main(ExceptionEx12.java:3)

1. 예외가 발생했을 때, 모두 3개의 메서드(main, method1, method2)가 호출 스택에 있었으며,
2. 예외가 발생한 곳은 제일 윗줄에 있는 method2()라는 것과
3. main 메서드가 method1()을, 그리고 method1()은 method2()를 호출했다는 것을 알 수 있다.
```

예외가 발생한 메서드에서 예외 처리를 하지 않고 자신을 호출한 메서드에게 예외를 넘겨준다. 예외를 단순히 전달만 하는 것이기 때문에 어느 한 곳에서 반드시 try-catch문으로 예외 처리를 해주어야 한다.

```java
// 1. method1()에서 예외 처리
ExceptionEx13 {
	public static void main(String[] args) {
		method1()
	}

	static void method1() {
		try {
			throw new Exception();
		} catch (Exception e) {
			System.out.println("method1 메서드에서 예외가 처리되었습니다.");
			e.printStackTrace();
		}
	}
}

// 2. main()에서 예외 처리
ExceptionEx13 {
	public static void main(String[] args) {
		try {
			method1()
		} catch (Exception e) {
			System.out.println("main 메서드에서 예외가 처리되었습니다.");
			e.printStackTrace();
		}
	}

	static void method1() throws Exception {
			throw new Exception();
	}
}
```

### finally 블럭

finally 블럭은 try-catch문과 함께 예외의 발생 여부에 상관없이 실행되어야 할 코드를 포함시킬 목적으로 사용된다.

```java
try {
	// 예외가 발생할 가능성이 있는 문장들을 넣는다.
} catch (Exception1 e) {
	// 예외 처리를 위한 문장을 적는다.
} finally {
	// 예외의 발생 여부에 관계없이 항상 수행되어야 하는 문장들을 넣는다.
	// finally 블럭은 try-catch문의 맨 마지막에 위치해야 한다.
}
```

예외가 발생한 경우에는 try → catch → finally 순으로 실행되고, 예외가 발생하지 않은 경우에는 try → finally 순으로 실행된다.

```java
try 블럭에서 return문이 실행되는 경우에도 finally 블럭의 문장들이 먼저 실행된 후에,
현재 실행 중인 메서드를 종료한다.

static void method1() {
	try {
		return;
	} catch (Exception1 e) {

	} finally {
		System.out.println("finally");
	}
}

// 실제 결과 : finally 출력
```

### 1.9 자동 자원 반환 - try -with -resources문

```java
try (FileInputStream fis = new FileInputStream("score.dat");
			DataInputStream dis = new DataInputStream("fis)) {
	while (true) {
		score = dis.readInt();
		System.out.println(score);
		sum += score;
	} catch (EOFException e) {
		System.out.println("점수의 총합은 " + sum + "입니다.");
	} catch (IOException ie) {
		ie.printStackTrace();
	}
}
```

try-with-resources문의 괄호()안에 객체를 생성하는 문제를 넣으면, 이 객체는 따로 close()를 호출하지 않아도 try 블럭을 벗어나는 순간 close()가 호출된다.
<br />
try-with-resources문에 의해 자동으로 객체의 close()가 호출될 수 있으려면, 클래스가 AutoCloseable이라는 인터페이스를 구현한 것이어야만 한다.

### 1.10 사용자 정의 예외 만들기

기존에 정의된 예외 클래스 외에 필요에 따라 프로그래머가 새로운 예외 클래스를 정의하여 사용할 수 있다.

```java
class MyException extends Exception {
	MyException(String msg) {
		super(msg);  // 조상인 Exception 클래스의 생성자 호출
	}
}

class MyException extends Exception {
	// 에러 코드 값을 저장하기 위한 필드 추가
	private final int ERR_CODE;

	MyException(String msg, int errCode) {
		super(msg);
		ERR_CODE = errCode;
	}

	MyException(String msg) {
		this(msg, 100);
	}

	public int getErroCode() {
		return ERR_CODE;	
	}
}
```

### 1.11 예외 되던지기 (exception re-throwing)

예외를 처리한 후에 인위적으로 다시 발생시키는 것을 `예외 되던지기`라고 한다.
<br />
하나의 예외에 대해서 예외가 발생한 메서드와 이를 호출한 메서드 양쪽 모두에서 처리해줘야 할 작업이 있을 때 사용된다.

```java
class ExceptionEx17 {
	public static void main(String[] args) {
		try {
			method1();
		} catch (Exception e) {

		}
	}

	static void method1() throws Exception {
		try {
			throw new Exception();
		} catch (Exception e) {
			throw e;  // 예외 재발생
		}
	}
}
```

### 1.12 연결된 예외 (chained exception)

한 예외가 다른 예외를 발생시킬 수 있다. 예외 A가 예외 B를 발생시켰다면, A를 B의 원인 예외(cause exception)라고 한다.

```java
try {
	startInstall();
	copyFiles();
} catch (SpaceException e) {
	InstallException ie = new InstallException("설치 중 에러 발생");
	ie.initCause(e);  // InstallException의 원인 예외를 SpaceException으로 지정
	throw ie;  // InstallException 발생
} catch (MemoryException me) {
	// ...
}

Throwable initCause(Throwable cause)  지정한 예외를 원인 예외로 등록
Throwable getCause()  원인 예외를 반환
```

왜 굳이 원인 예외로 등록해서 다시 예외를 발생시킬까 ?

- `여러가지 예외를 하나의 큰 분류의 예외로 다시 묶어서 다루기 위해`
- `checked 예외를 unchecked 예외로 바꿀 수 있도록 하기 위해`

```java
RuntimeException(Throwable casue)  // 원인 예외를 등록하는 생성자

// checked 예외를 RuntimeException으로 감싸서, unchecked 예외로 변경 
ex) throw new RuntimeException(new MemoryException("메모리가 부족합니다."));
  ```
