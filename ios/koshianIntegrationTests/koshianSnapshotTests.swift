//
//  koshianSnapshotTests.swift
//  koshian
//
//  Created by Masahiko Okada on 2015/11/10.
//  Copyright © 2015年 Facebook. All rights reserved.
//

import UIKit
import XCTest


class koshianSnapshotTests: XCTestCase {

  var _runner: RCTTestRunner? = nil;
  
  override func setUp() {
    super.setUp()
    let version: NSOperatingSystemVersion = NSProcessInfo.processInfo().operatingSystemVersion
    assert((version.majorVersion == 8 && version.minorVersion >= 3) || version.majorVersion >= 9, "Test should be run")
    self._runner = RCTTestRunner.init(app: "ios/koshianIntegrationTests/jsBuild/SnapshotTestsApp", referenceDirectory: FB_REFERENCE_IMAGE_DIR, moduleProvider: nil)
    // スタイル変更時にコメントアウトして画面を記録する
    // self._runner!.recordMode = true;
  }
  
  override func tearDown() {
    super.tearDown()
  }

  
  func testZZZNotInRecordMode() {
    XCTAssertFalse(self._runner!.recordMode, "Don't forget to turn record mode back to off");
  }

  func testLoginFormSnapshotTest() {
    self._runner!.runTest("LoginFormSnapshotTest", module: "LoginFormSnapshotTest")
  }
}
