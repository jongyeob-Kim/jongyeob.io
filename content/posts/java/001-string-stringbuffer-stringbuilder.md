---
title: "[Java] String, StringBuffer, StringBuilder 파헤치기"
date: "2020-02-19T09:13"
template: "post"
draft: false
slug: "/posts/java/string-stringbuffer-stringbuilder"
category: "Java"
tags:
  - "Java"
description: "자바에서는 String을 많이 사용한다. 특히 덧셈 연산자(+)를 이용해 String을 변경하는 등의 작업을 많이 한다. String을 이용한 작업이 많을 때는 StringBuffer나 StringBuilder를 이용하라고 하는데, 어떤 경우에 두 클래스를 사용해야 하는지 정리를 해보았다. 이번 포스팅을 통해 String, StringBuffer, StringBuilder의 차이점을 이해하고 상황에 맞춰 사용하도록 하자."
---

자바에서는 String을 많이 사용한다. 특히 덧셈 연산자(+)를 이용해 String을 변경하는 등의 작업을 많이 한다. String을 이용한 작업이 많을 때는 StringBuffer나 StringBuilder를 이용하라고 하는데, 어떤 경우에 두 클래스를 사용해야 하는지 정리를 해보았다. 이번 포스팅을 통해 String, StringBuffer, StringBuilder의 차이점을 이해하고 상황에 맞춰 사용하도록 하자.


## String 클래스

기존의 다른 언어에서는 문자열을 char 형의 배열로 다루었으나 자바에서는 문자열을 위한 클래스인 String을 제공한다.

### 변경 불가능한 클래스

String 클래스는 문자열을 저장하기 위해 문자형 배열 변수(char[]) value를 인스턴스 변수로 정의한다.

```java
public final class String 
  implements java.io.Serializable, Comparable<String>, CharSequence 
{
  /** The value is used for character storage. */
  private final char value[];
  ...
}
```

한번 생성된 String 인스턴스가 갖고 있는 `문자열은 읽어 올 수만 있고, 변경할 수는 없다`.
<br />
덧셈 연산자(+)를 이용해서 문자열을 결합하는 경우, 인스턴스 내의 문자열이 바뀌는 것이 아니라 새로운 문자열이 담긴 String 인스턴스가 생성된다. 덧셈 연산자를 이용한 문자열 결합은 매 연산 마다 새로운 문자열을 가진 String 인스턴스가 생성되어 메모리 공간을 차지한다.
<br />
문자열 연산이 많이 필요한 경우에는 StringBuffer, StringBuilder 클래스를 사용하는 것이 좋다.


## StringBuffer 클래스

String 클래스는 인스턴스를 생성할 때 지정된 문자열의 크기를 변경할 수 없지만, StringBuffer 클래스는 문자열의 크기를 변경할 수 있다. 내부적으로 버퍼(buffer)를 가지고 있으며, 편집할 문자열의 길이를 고려해 버퍼의 길이를 지정해야 한다. 버퍼의 길이를 넘어서면 버퍼의 길이를 늘려주는 작업이 수행된다.
<br />
StringBuffer 클래스는 AbstractStringBuilder 추상 클래스를 상속받아, 문자열을 저장하기 위한 문자형 배열 변수(char[]) value를 인스턴스 변수로 가지고 있다.

```java
// 추상 클래스 AbstractStringBuilder
abstract class AbstractStringBuilder implements Appendable, CharSequence {
  /**
    * The value is used for character storage.
    */
  char[] value;
  ...
}

// StringBuffer 클래스
public final class StringBuffer
    extends AbstractStringBuilder
    implements java.io.Serializable, CharSequence
{
  ...
}
```

### StringBuffer 클래스 생성자

StringBuffer 인스턴스를 생성할 때, 버퍼의 크기를 지정해주지 않으면 `기본적으로 16개의 문자`를 지정할 수 있는 크기의 버퍼를 생성한다.

StringBuffer 생성자

```java
/**
  * Constructs a string buffer with no characters in it and an
  * initial capacity of 16 characters.
  */
public StringBuffer() {  // default 생성자는 버퍼 크기 16으로 지정
    super(16);
}

/**
  * Constructs a string buffer with no characters in it and
  * the specified initial capacity.
  *
  * @param      capacity  the initial capacity.
  * @exception  NegativeArraySizeException  if the {@code capacity}
  *               argument is less than {@code 0}.
  */
public StringBuffer(int capacity) {
    super(capacity);
}

/**
  * Constructs a string buffer initialized to the contents of the
  * specified string. The initial capacity of the string buffer is
  * {@code 16} plus the length of the string argument.
  *
  * @param   str   the initial contents of the buffer.
  */
public StringBuffer(String str) {
    super(str.length() + 16);
    append(str);
}
```

### 버퍼 크기 변경

문자열 연산을 할 때, 버퍼의 크기가 문자열의 길이보다 작을 때는 내부적으로 버퍼의 크기를 증가시키는 작업이 수행된다.

StringBuffer 클래스의 apply() 메소드가 실행되었을 때, 현재 버퍼 크기를 초과하는지 확인한다. 아래 메소드는 AbstractStringBuilder에 정의되어 있다.
```java
// 추상 클래스 AbstractStringBuilder에 정의된 메소드
/**
  * For positive values of {@code minimumCapacity}, this method
  * behaves like {@code ensureCapacity}, however it is never
  * synchronized.
  * If {@code minimumCapacity} is non positive due to numeric
  * overflow, this method throws {@code OutOfMemoryError}.
  */
private void ensureCapacityInternal(int minimumCapacity) {
    // overflow-conscious code
    if (minimumCapacity - value.length > 0) {  // 최소 용량이 기존 문자형 배열보다 크면 크기 증가
        value = Arrays.copyOf(value,
                newCapacity(minimumCapacity));
    }
}
...
/**
  * The maximum size of array to allocate (unless necessary).
  * Some VMs reserve some header words in an array.
  * Attempts to allocate larger arrays may result in
  * OutOfMemoryError: Requested array size exceeds VM limit
  */
private static final int MAX_ARRAY_SIZE = Integer.MAX_VALUE - 8;

/**
  * Returns a capacity at least as large as the given minimum capacity.
  * Returns the current capacity increased by the same amount + 2 if
  * that suffices.
  * Will not return a capacity greater than {@code MAX_ARRAY_SIZE}
  * unless the given minimum capacity is greater than that.
  *
  * @param  minCapacity the desired minimum capacity
  * @throws OutOfMemoryError if minCapacity is less than zero or
  *         greater than Integer.MAX_VALUE
  */
private int newCapacity(int minCapacity) {
    // overflow-conscious code
    int newCapacity = (value.length << 1) + 2;
    if (newCapacity - minCapacity < 0) {
        newCapacity = minCapacity;
    }
    return (newCapacity <= 0 || MAX_ARRAY_SIZE - newCapacity < 0)
        ? hugeCapacity(minCapacity)
        : newCapacity;
}

private int hugeCapacity(int minCapacity) {
    if (Integer.MAX_VALUE - minCapacity < 0) { // overflow
        throw new OutOfMemoryError();
    }
    return (minCapacity > MAX_ARRAY_SIZE)
        ? minCapacity : MAX_ARRAY_SIZE;
}
```


## StringBuilder 클래스

StringBuffer는 멀티스레드에 안전(thread safe)하도록 동기화되어 있다. 동기화가 StringBuffer의 성능을 떨어뜨리는데, 멀티스레드로 작성된 프로그램이 아니면 StringBuffer의 동기화는 불필요하다. 자바에서는 StringBuffer에서 스레드 동기화를 제외한, StringBuilder 클래스를 정의하였다. StringBuilder는 StringBuffer와 동일한 기능을 가지고 있다.

StringBuilder 역시 AbstractStringBuilder 추상 클래스를 상속받아 구현되어 있다.

```java
// StringBuilder 클래스
public final class StringBuilder
    extends AbstractStringBuilder
    implements java.io.Serializable, CharSequence
{

  /** use serialVersionUID for interoperability */
  static final long serialVersionUID = 4383685877147921099L;

  /**
    * Constructs a string builder with no characters in it and an
    * initial capacity of 16 characters.
    */
  public StringBuilder() {
      super(16);
  }

  /**
    * Constructs a string builder with no characters in it and an
    * initial capacity specified by the {@code capacity} argument.
    *
    * @param      capacity  the initial capacity.
    * @throws     NegativeArraySizeException  if the {@code capacity}
    *               argument is less than {@code 0}.
    */
  public StringBuilder(int capacity) {
      super(capacity);
  }

  /**
    * Constructs a string builder initialized to the contents of the
    * specified string. The initial capacity of the string builder is
    * {@code 16} plus the length of the string argument.
    *
    * @param   str   the initial contents of the buffer.
    */
  public StringBuilder(String str) {
      super(str.length() + 16);
      append(str);
  }

  /**
    * Constructs a string builder that contains the same characters
    * as the specified {@code CharSequence}. The initial capacity of
    * the string builder is {@code 16} plus the length of the
    * {@code CharSequence} argument.
    *
    * @param      seq   the sequence to copy.
    */
  public StringBuilder(CharSequence seq) {
      this(seq.length() + 16);
      append(seq);
  }
  ...
}
```