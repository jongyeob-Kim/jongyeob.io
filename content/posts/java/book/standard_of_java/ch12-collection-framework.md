---
title: "[자바의 정석] Chapter 12. 컬렉션 프레임워크"
date: "2020-02-10T14:53"
template: "post"
draft: false
slug: "/posts/java/book/standard-of-java/ch12-collection-framework/"
category: "Java"
tags:
  - "Java"
  - "자바의 정석"
  - "컬렉션"
description: "컬렉션 프레임워크란 데이터 군을 저장하는 클래스들을 표준화한 설계를 뜻한다. "
---

---

### 목차

- [컬렉션 프레임워크의 핵심 인터페이스](#컬렉션-프레임워크의-핵심-인터페이스)
- [ArrayList](#arraylist)
- [LinkedList](#linkedlist)
- [Stack과 Queue](#stack과-queue)
- [Iterator, ListIterator, Enumeration](#iterator-listiterator-enumeration)
- [Arrays](#arrays)
- [Comparator와 Comparable](#comparator와-comparable)
- [HashSet](#hashset)
- [TreeSet](#treeset)
- [HashMap과 HashTable](#hashmap과-hashtable)
- [TreeMap](#treemap)
- [Properties](#properties)
- [Collections](#collections)
- [정리하기](#정리하기)

---

## 컬렉션 프레임워크 (Collections Framework)

컬렉션 프레임워크란 `데이터 군(컬렉션)을 저장하는 클래스들을 표준화한 설계`를 뜻한다.
<br />
프레임워크는 표준화된 프로그래밍 방식을 의미한다.
<br />
Java API 문서에서는 컬렉션 프레임워크를 `데이터 군(group)을 다루고 표현하기 위한 단일화된 구조`라고 정의한다.
<br />
자바의 컬렉션 프레임워크는 다수의 데이터를 다루는 데 필요한 다양하고 풍부한 클래스들을 제공한다.

### 컬렉션 프레임워크의 핵심 인터페이스

컬렉션 프레임워크에서는 각 컬렉션을 다루는 데 필요한 기능을 가진 3개의 인터페이스를 정의했다. 인터페이스 List와 Set의 공통된 부분을 다시 뽑아서 새로운 인터페이스인 Collection을 추가로 정의했다.
<br />
Collection 인터페이스는 컬렉션 클래스에 저장된 데이터를 읽고 추가하고 삭제하는 등 컬렉션을 다루는데 가장 기본적인 메소드들을 정의하고 있다.

![Collection 인터페이스](/media/008-collection-interface.png)

|인터페이스|특징|
|---|-----|
|List|순서가 있는 데이터의 집합. 데이터의 중복을 허용한다.<br />구현클래스 : ArrayList, LinkedList, Stack, Vector 등|
|Set|순서를 유지하지 않는 데이터의 집합. 데이터의 중복을 허용하지 않는다.<br /> 구현클래스 : HashSet, TreeSet 등
|Map|키(key)와 값(value)으로 쌍(pair)으로 이루어진 데이터의 집합. 순서는 유지되지 않으며, 키는 중복을 허용하지 않고, 값은 중복을 허용한다.|구현클래스: HashMap, TreeMap, HashTable, Properites 등

#### List 인터페이스

List 인터페이스는 `중복을 허용`하면서 `저장 순서가 유지`되는 컬렉션을 구현하는데 사용된다.

![List 인터페이스](/media/008-list-interface.png)

#### Set 인터페이스

Set 인터페이스는 `중복을 허용하지 않고` `저장 순서가 유지되지 않는` 컬렉슨 클래스를 구현하는데 사용된다.

![Set 인터페이스](/media/008-set-interface.png)

#### Map 인터페이스

Map 인터페이스는 `키(key)`와 `값(value)`을 하나의 쌍으로 묶어서 저장하는 컬렉션 클래스를 구현하는데 사용된다.
<br />
키는 중복될 수 없지만 값은 중복을 허용한다. 기존에 저장된 데이터와 중복된 키와 값을 저장하면 기존의 값은 없어지고 마지막에 저장된 값이 남게 된다.

![Hash 인터페이스](/media/008-hash-interface.png)

**Map.Entry 인터페이스**

Map.Entry 인터페이스는 Map 인터페이스의 내부 인터페이스이다. Map에 저장되어 있는 key-value 쌍을 다루기 위해 내부적으로 Entry 인터페이스를 정의해놓았다.

```
public interface Map {
  ...
  interface Entry {
    Object getKey();
    Object getValue();
    ...
  }
  ...
}
```


### ArrayList

ArrayList는 기존의 Vector를 개선한 것이다.
<br />
배열에 더 이상 저장할 새로운 공간이 없으면(기본 크기 10) 보다 큰 새로운 배열을 생성해서 기존의 배열에 저장된 내용을 새로운 배열로 복사한 다음에 저장한다.

```java
public class ArrayList extends abstractList
  implements List, RandomAccess, Cloneable, java.io.Serializable {
  ...
  transient Object[] elementData;  // Object 배열
  ...
}
```

ArrayList나 Vector와 같은 배열을 이용한 자료구조는 데이터를 읽어오고 저장하는 데는 효율이 좋지만, 용량을 변경해야 할 때는 새로운 배열을 생성한 후 기존의 배열로부터 새로 생성된 배열로 데이터를 복사해야 하기 때문에 효율이 떨어진다는 단점을 가지고 있다.

배열에 객체를 순차적으로 저장할 때와 객체를 마지막에 저장된 것부터 삭제하면 System.arrayCopy()를 호출하지 않기 때문에 작업 시간이 짤지만, 배열의 중간에 위차한 객체를 추가하거나 삭제하는 경우 System.arrayCopy()를 호출해서 다른 데이터의 위치를 이동시켜 줘야 하기 때문에 다루는 데이터의 개수가 많을수록 작업 시간이 오래 걸린다.

`인덱스를 이용한 데이터 검색을 빠르나, 데이터의 추가/삭제 효율이 좋지 못하다.`

```
인덱스가 n인 데이터의 주소 = 배열의 주소 + n * 데이터 타입의 크기
```


### LinkedList

**배열의 장점**
- 가장 기본적인 형태의 자료구조로 구조가 간단하며 사용하기 쉽다. 데이터를 읽어오는 데 걸리는 시간(접근 시간, access time)이 가장 빠르다.

**배열의 단점**
- 크기를 변경할 수 없다.
   - 크기를 변경할 수 없으므로 `새로운 배열을 생성해서 데이터를 복사`해야 한다. 
   - 실행 속도를 향상시키기 위해서는 충분히 큰 크기의 배열을 생성해야 하므로 메모리가 낭비된다.
- 비순차적인 데이터의 추가 또는 삭제에 시간이 많이 걸린다.
   - 배열의 중간에 데이터를 추가하려면 빈자리를 만들기 위해 다른 데이터들을 복사해서 이동해야 한다.

ArrayList 데이터가 연속적으로 존재하지만 LinkedList는 불연속적으로 존재하는 데이터를 서로 `연결한 형태`로 구성되어 있다.
<br />
LinkedList 클래스는 더블 링크드 리스트로 구현되어 있다. LinkedList의 낮은 접근성을 높이기 위해.

|컬렉션|읽기(접근시간)|추가/삭제|비고|
|----|--|--|-----|
|ArrayList|빠르다|느리다|순차적인 추가/삭제는 더 빠름. 비효율적인 메모리 사용|
|LinkedList|느리다|빠르다|데이터가 많을수록 접근성이 떨어짐|

데이터 개수가 변하지 않는 경우라면 ArrayList
<br />
데이터 개수의 변경이 잦다면 LinkedList


### Stack과 Queue

#### Stack (스택)

- 마지막에 저장한 데이터를 먼저 꺼내는 LIFO(Last In First Out) 구조로 되어 있다.
- ArrayList로 구현하는 것이 적합하다.
- 활용 : undo/redo, 웹브라우저의 뒤로가기/앞으로가기, 메소드 호출

#### Queue (큐)

- 처음에 저장한 데이터를 가장 먼저 꺼내게 되는 FIFO(First In First Out) 구조로 되어 있다.
- 데이터의 추가/삭제가 쉬운 LinkedList로 구현하는 것이 적합하다.
- 대기 목록
- 버퍼(buffer), 리눅스의 history 명령, 프로그램 최근 사용 목록

#### Priorty Queue (우선순위 큐)

- Queue 인터페이스의 구현체 중 하나이다.
- 저장한 순서에 관계없이 우선순위가 높은 것부터 꺼낸다.
- null 저장 시 NullPointerException 발생

```
우선순위는 숫자가 작을수록 높다.

input [1, 2, 5, 3, 4]
output [1, 2, 3, 4, 5]
```

#### Deque (덱, 디큐)

- 큐와 달리 양쪽 끝에 추가/삭제가 가능하다.
- 구현체로는 ArrayDequeue와 LinkedList 등이 있다.
- 스택과 큐를 하나로 합쳐놓은 것과 같다.


### Iterator, ListIterator, Enumeration

Iterator, ListIterator, Enumeration 모두 컬렉션에 저장된 요소에 접근하는데 사용되는 인터페이스이다.
Enumeration은 Interator의 구버전이며, ListIterator는 Iterator의 기능을 향상시킨 것이다.

#### Iterator

컬렉션 프레임워크에서는 컬렉션에 저장된 요소들을 읽어오는 방법을 표준화하였다.

```java
public interface Iterator() {
  boolean hasNext();
  Object next();
  void remove();
}

public interface Collection {
  ...
  // Collection 인터페이스에 Iterator를 반환하는 iterator() 메소드 정의
  public Iterator iterator();
  ...
}
```

#### ListIterator와 Enumeration

- Enumeration — 컬렉션 프레임워크가 만들어지기 이전에 사용하던 것으로 Iterator의 구버전이다.
- ListIterator — Iterator에 양방향 조회 기능 추가 (List 인터페이스를 구현한 경우에만 사용 가능)


### Arrays

Arrays 클래스에는 배열을 다루는데 유용한 클래스가 정의되어 있다.

**(1) 배열의 복사**
- copyOf() — 배열 전체 복사
- copyOfRange() — 배열의 일부 복사

**(2) 배열 채우기**
- fill() — 배열의 모든 요소를 지정된 값으로 채운다.
- setAll() — 배열을 채우는 데 사용할 함수형 인터페이스를 매개변수로 받는다.

**(3) 배열의 정렬과 검색**
- sort() — 배열 정렬
- binarySearch() — 이진 탐색. 정렬되어 있는 경우만. 중복값 있는 경우 어떤 위치 반환될지 모름

**(4) 문자열의 비교와 출력**
- equals() — 일차원 배열 요소 비교
- deepToEquals() — 다차원 배열 요소 비교
- toString() — 배열의 모든 요수 문자열로 반환
- deepToString() — 다차원 배열의 모든 요소 문자열로 반환

**(5) 배열을 List로 변환**
- asList(Object... a) — 배열을 List로 담아서 반환한다.
- asList()가 반환한 List의 크기를 변경할 수 없다. (추가/삭제 불가능)


### Comparator와 Comparable

Comparator와 Comparable은 모두 인터페이스로 `컬렉션을 정렬하는데 필요한 메소드를 정의`하고 있다.

#### Comparable

기본 정렬 기준을 구현하는데 사용

#### Comparator

기본 정렬 기준 외에 다른 기준으로 정렬하고자 할 때 사용


### HashSet

HashSet은 Set 인터페이스를 구현한 가장 대표적인 컬렉션이다. 중복된 요소를 저장하지 않는다.
<br />
저장 순서를 유지하고자 한다면 `LinkedHashSet`을 사용해야 한다. 


### TreeSet

TreeSet은 이진 검색 트리(Binary Tree Search)라는 자료구조의 형태로 데이터를 저장하는 컬렉션 프레임워크이다. 이진 검색 트리는 `정렬, 검색, 범위검색에 높은 성능`을 보이는 자료구조이다.
<br />
TreeSet은 정렬된 상태를 유지하기 때문에 단일 값 검색과 범위 검색 속도가 빠르다.
<br />
`링크드 리스트보다 데이터의 추가/삭제가 느리다. 대신 배열이나 링크드 리스트에 비해 검색과 정렬 기능이 뛰어나다.`

```
이전 검색 트리 (Binary Search Tree)
 - 모든 노드는 최대 두 개의 자식 노드를 가질 수 있다.
 - 왼쪽 자식 노드의 값은 부모 노드의 값보다 작고 오른쪽 자식 노드의 값은 부모 노드의 값보다 크다.
 - 노드의 추가/삭제에 시간이 걸린다. (순차적으로 저장하지 않으므로)
 - 검색(범위검색)과 정렬에 유리하다.
 - 중복된 값을 저장하지 못한다.
```


### HashMap과 HashTable

HashTable은 HashMap의 구버전이다.
<br />
HashMap은 Map의 구현체이다. Map의 특징인 키(key), 값(value)을 묶어서 하나의 데이터(entry)로 저장한다. 해싱을 사용하기 때문에 많은 양의 데이터를 검색하는데 있어서 뛰어난 성능을 보인다.

```
키(key) : 컬렉션 내의 키 중에서 유일해야 한다. 저장된 값을 찾는데 사용
값(value) : 키와 달리 데이터의 중복을 허용해야 한다.
```

#### 해싱과 해싱 함수

해싱이랑 `해시 함수를 이용해서 데이터를 해시 테이블에 저장하고 검색하는 기법`을 말한다.
<br />
해싱에서 사용되는 자료구조는 배열과 링크드 리스트의 조합으로 되어 있다.

![해싱](/media/008-hashing.png)

- (1) 검색하고자 하는 값의 키로 해시 함수를 호출한다.
- (2) 해시 함수의 계산 결과(해시코드)로 해당 값이 저장되어 있는 배열 요소를 찾는다.
- (3) 링크드 리스트에서 검색한 키와 일치하는 데이터를 찾는다.

### TreeMap

이진 검색 트리의 형태로 키와 값의 쌍으로 이루어진 데이터를 저장한다.
<br />
검색과 정렬에 적합하다. `검색에 관한한 대부분의 경우 HashMap이 TreeMap보다 더 뛰어나다`. 범위 검색이나 정렬이 필요한 경우 TreeMap 사용.

### Properties

Properties는 HashMap의 구버전인 HashTable을 상속받아 구현한 것이다. HashTable은 키와 값 (Obejct, Object) 형태로 저장하는데 비해, Properties는 (String, String) 형태로 저장하는 보다 단순화된 컬렉션 클래스이다.
<br />
주로 애플리케이션의 환경설정과 관련된 속성(property)을 저장하는데 사용되며 파일로부터 읽고 쓰는 편리한 기능을 제공한다.

### Collections

Collections는 컬렉션과 관련된 메소드를 제공한다.

**(1) 컬렉션의 동기화**
- 멀티 스레드 프로그래밍에서는 데이터의 일관성을 유지하기 위해 공유되는 객체에 동기화가 필요하다.
- 새로 추가된 ArrayList, HashMap과 같은 컬렉션은 동기화를 자체적으로 처리하지 않고 필요한 경우에만 java.util.Collections 클래스의 동기화 메소드를 이용해 동기화를 처리한다.

**(2) 변경불가 컬렉션 만들기**
- 읽기전용 컬렉션으로 만든다. 주로 멀티 스레드 환경에서 컬렉션 공유 방지하기 위해 사용

**(3) 싱글톤 컬렉션 만들기**
- 인스턴스 개수 생성 제한

**(4) 한 종류의 객체만 저장하는 컬렉션 만들기**
- 지정된 종류의 객체만 저장할 수 있도록 제한


### 정리하기

#### 컬렉션 클래스 관계도

![컬렉션 클래스 관계도](/media/008-collection-relation.png)

---

### Reference

- [자바의 정석](https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=76083001)
