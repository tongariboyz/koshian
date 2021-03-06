//
//  TodayViewController.swift
//  koshianToday
//
//  Created by Masahiko Okada on 2015/11/12.
//  Copyright © 2015年 Facebook. All rights reserved.
//

import UIKit
import NotificationCenter

class TodayViewController: UIViewController, NCWidgetProviding {
        
    @IBOutlet weak var openButton: UIButton!

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view from its nib.
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func widgetPerformUpdateWithCompletionHandler(completionHandler: ((NCUpdateResult) -> Void)) {
        // Perform any setup necessary in order to update the view.

        // If an error is encountered, use NCUpdateResult.Failed
        // If there's no update required, use NCUpdateResult.NoData
        // If there's an update, use NCUpdateResult.NewData

        completionHandler(NCUpdateResult.NewData)
    }

    // Today Extension にデフォルトで入る右余白をゼロにする
    func widgetMarginInsetsForProposedMarginInsets(defaultMarginInsets: UIEdgeInsets) -> UIEdgeInsets {
        return  UIEdgeInsetsZero
    }

    @IBAction func touchOpenButton(sender: UIButton) {
      let scheme = NSURL(string: "koshian://")
      self.extensionContext!.openURL(scheme!, completionHandler: nil)
    }
}
